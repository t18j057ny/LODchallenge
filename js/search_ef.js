$('#query').focus(function(){
    $('#l_query').animate({'color': '#3be5ae'}, 500);
}).blur(function(){
    $('#l_query').animate({'color': 'white'}, 500);
});