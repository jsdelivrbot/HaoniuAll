$(function(){
    $("#hear li").click(function(){
    $(this).css({
         borderBottom: "2px solid red",
         height:"43px"
    }).siblings().css({
        borderBottom: "none",
        height:"45px"
    });
});                
                         
$("#hear li").click(function(){
        $(this).addClass("action").siblings().removeClass("action");
        var index = $(this).index();
        $("#contentop li").eq(index).css("display","block").siblings().css("display","none");
        });
    });