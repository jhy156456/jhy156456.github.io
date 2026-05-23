# JPEG EXIF Orientation(274)을 반영해 세로·가로가 맞는 썸네일을 만듭니다.
# 원본을 추가·교체한 뒤 PowerShell에서 실행: .\wedding\build-gallery-thumbs.ps1

$ErrorActionPreference = "Stop"
Add-Type -AssemblyName System.Drawing

function Apply-ExifOrientation([System.Drawing.Image]$image) {
  # PropertyTagOrientation = 0x0112 = 274
  $exifOrientationId = 274
  foreach ($prop in $image.PropertyItems) {
    if ($prop.Id -ne $exifOrientationId) {
      continue
    }
    if ($null -eq $prop.Value -or $prop.Value.Length -lt 2) {
      return
    }
    $o = [BitConverter]::ToUInt16($prop.Value, 0)
    switch ($o) {
      1 { }
      2 { $image.RotateFlip([System.Drawing.RotateFlipType]::RotateNoneFlipX) }
      3 { $image.RotateFlip([System.Drawing.RotateFlipType]::Rotate180FlipNone) }
      4 { $image.RotateFlip([System.Drawing.RotateFlipType]::RotateNoneFlipY) }
      5 { $image.RotateFlip([System.Drawing.RotateFlipType]::Rotate90FlipX) }
      6 { $image.RotateFlip([System.Drawing.RotateFlipType]::Rotate90FlipNone) }
      7 { $image.RotateFlip([System.Drawing.RotateFlipType]::Rotate270FlipX) }
      8 { $image.RotateFlip([System.Drawing.RotateFlipType]::Rotate270FlipNone) }
      default { }
    }
    return
  }
}

$repoRoot = Split-Path $PSScriptRoot -Parent

$srcDir = Join-Path $repoRoot "assets\images\wedding\gallery"
$thumbDir = Join-Path $srcDir "thumbs"

if (-not (Test-Path $srcDir)) {
  Write-Error "Gallery folder not found: $srcDir"
}

New-Item -ItemType Directory -Force -Path $thumbDir | Out-Null

$jpegCodec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq "image/jpeg" }
$encParams = New-Object System.Drawing.Imaging.EncoderParameters 1
$encParams.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter ([System.Drawing.Imaging.Encoder]::Quality, 78L)

Get-ChildItem -LiteralPath $srcDir -File -Filter "gallery-*.jpg" | Where-Object { $_.DirectoryName -eq $srcDir } | ForEach-Object {
  $img = [System.Drawing.Image]::FromFile($_.FullName)
  try {
    Apply-ExifOrientation -image $img

    $maxSide = 240
    $w = $img.Width
    $h = $img.Height
    $scale = [Math]::Min(1.0, [Math]::Min($maxSide / $w, $maxSide / $h))
    $nw = [Math]::Max(1, [int][Math]::Round($w * $scale))
    $nh = [Math]::Max(1, [int][Math]::Round($h * $scale))
    $bmp = New-Object System.Drawing.Bitmap $nw, $nh
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    $g.DrawImage($img, 0, 0, $nw, $nh)
    $outPath = Join-Path $thumbDir $_.Name
    $bmp.Save($outPath, $jpegCodec, $encParams)
    $g.Dispose()
    $bmp.Dispose()
    Write-Host ("OK {0} ({1} bytes)" -f $_.Name, (Get-Item $outPath).Length)
  }
  finally {
    $img.Dispose()
  }
}

Write-Host "Done. Thumbs: $thumbDir"
