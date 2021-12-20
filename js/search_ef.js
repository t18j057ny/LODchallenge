$('#query').focus(function(){
    $('#l_query').animate({'color': 'rgb(255, 153, 0)'}, 500);
}).blur(function(){
    $('#l_query').animate({'color': 'white'}, 500);
});
