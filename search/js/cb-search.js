 $(document).ready(function () {
        var time1 = 0;
        var show = false;
        var names = new Array(); // Post names
        var urls = new Array(); // Post URLs
        $(document).keyup(function (e) {
            var time2 = new Date().getTime();
            if (e.keyCode == 17) {
                var gap = time2 - time1;
                time1 = time2;
                if (gap < 500) {
                    if (show) {
                        $(".cb-search-tool").css("display", "none");
                        show = false;
                    } else {
                        $(".cb-search-tool").css("display", "block");
                        show = true;
                        $("#cb-search-content").val("");
                        $("#cb-search-content").focus();
                    }
                    time1 = 0;
                }
			}else if(e.keyCode == 27){
                    $(".cb-search-tool").css("display", "none");
                    show = false;
                    time1 = 0;
                }
        });

 		$("#cb-search-content").keyup(function (e) {
            var time2 = new Date().getTime();
            if (e.keyCode == 17) {
                var gap = time2 - time1;
                time1 = time2;
                if (gap < 500) {
                    if (show) {
                        $(".cb-search-tool").css("display", "none");
                        show = false;
                    } else {
                        $(".cb-search-tool").css("display", "block");
                        show = true;
                        $("#cb-search-content").val("");
                        $("#cb-search-content").focus();
                    }
                    time1 = 0;
                }
            }
        });

        $("#cb-close-btn").click(function () {
            $(".cb-search-tool").css("display", "none");
            show = false;
            time1 = 0;
        });

        $("#cb-search-btn").click(function(){
            $(".cb-search-tool").css("display", "block");
            show = true;
            $("#cb-search-content").val("");
            $("#cb-search-content").focus();
            time1 = 0;
        });

        $.getJSON("/search/cb-search.json").done(function (data) {
            if (data.code == 0) {
                for (var index in data.data) {
                    var item = data.data[index];
                    names.push(item.title);
                    urls.push(item.url);
                }
                
                // 전역 변수로 설정하여 다른 스크립트에서 접근 가능하게 함
                window.names = names;
                window.urls = urls;

                $("#cb-search-content").typeahead({
                    source: names,

                    afterSelect: function (item) {
						$(".cb-search-tool").css("display", "none");
                        show = false;
                        window.location.href = (urls[names.indexOf(item)]);
                        return item;
                    }
                });
            }
        });
    });
