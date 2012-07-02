vista.on("init", function(event){
    $('script [type^="vista"').each(function(){
      var src = $(this).attr('src');
      vista.addScript(src ? vista.loadScript(src) : $(this).text, 'vista');
    });
});