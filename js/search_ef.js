$('#query').focus(function(){
    $('#l_query').animate({'color': 'rgb(255, 187, 41)'}, 500);
}).blur(function(){
    $('#l_query').animate({'color': 'white'}, 500);
});
