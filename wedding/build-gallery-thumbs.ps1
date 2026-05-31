# Builds gallery thumbnails and lightbox display images from the original JPEGs.
# Run from the repo root:
#   .\wedding\build-gallery-thumbs.ps1

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

function Save-ResizedJpeg(
  [System.Drawing.Image]$source,
  [string]$outPath,
  [int]$maxSide,
  [long]$quality,
  [System.Drawing.Imaging.ImageCodecInfo]$jpegCodec
) {
  $w = $source.Width
  $h = $source.Height
  $scale = [Math]::Min(1.0, [Math]::Min($maxSide / $w, $maxSide / $h))
  $nw = [Math]::Max(1, [int][Math]::Round($w * $scale))
  $nh = [Math]::Max(1, [int][Math]::Round($h * $scale))

  $bmp = New-Object System.Drawing.Bitmap $nw, $nh
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $encParams = New-Object System.Drawing.Imaging.EncoderParameters 1
  $encParams.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter ([System.Drawing.Imaging.Encoder]::Quality, $quality)

  try {
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    $g.DrawImage($source, 0, 0, $nw, $nh)
    $bmp.Save($outPath, $jpegCodec, $encParams)
  }
  finally {
    $g.Dispose()
    $bmp.Dispose()
    $encParams.Dispose()
  }
}

$repoRoot = Split-Path $PSScriptRoot -Parent

$srcDir = Join-Path $repoRoot "assets\images\wedding\gallery"
$thumbDir = Join-Path $srcDir "thumbs"
$displayDir = Join-Path $srcDir "display"

if (-not (Test-Path $srcDir)) {
  Write-Error "Gallery folder not found: $srcDir"
}

New-Item -ItemType Directory -Force -Path $thumbDir | Out-Null
New-Item -ItemType Directory -Force -Path $displayDir | Out-Null

$jpegCodec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq "image/jpeg" }

Get-ChildItem -LiteralPath $srcDir -File -Filter "gallery-*.jpg" | Where-Object { $_.DirectoryName -eq $srcDir } | ForEach-Object {
  $img = [System.Drawing.Image]::FromFile($_.FullName)
  try {
    Apply-ExifOrientation -image $img

    $thumbPath = Join-Path $thumbDir $_.Name
    Save-ResizedJpeg -source $img -outPath $thumbPath -maxSide 240 -quality 78L -jpegCodec $jpegCodec

    $displayPath = Join-Path $displayDir $_.Name
    Save-ResizedJpeg -source $img -outPath $displayPath -maxSide 2000 -quality 82L -jpegCodec $jpegCodec

    Write-Host ("OK {0} thumb={1:N0} display={2:N0}" -f $_.Name, (Get-Item $thumbPath).Length, (Get-Item $displayPath).Length)
  }
  finally {
    $img.Dispose()
  }
}

Write-Host "Done. Thumbs: $thumbDir"
Write-Host "Done. Display: $displayDir"
