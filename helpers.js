var register = function(Handlebars) {
    var helpers = {
      // put all of your helpers inside this object
      counter: function(index){
          var x=0;
          return x++;
      },
      checkon: function(x,y){
        var ptr=false;
        for(i=0;i<y.length;i++){
          if(y[i]===x){
            ptr=true
          }
        }
        return ptr;
      },
      compare: function(x,y){
        if(x===y){
          return true;
        }
        else{
          return false;
        }
      }
      

    };
  
    if (Handlebars && typeof Handlebars.registerHelper === "function") {
      // register helpers
      for (var prop in helpers) {
          Handlebars.registerHelper(prop, helpers[prop]);
      }
    } else {
        // just return helpers object if we can't register helpers here
        return helpers;
    }
  
  };
  
  module.exports.register = register;
  module.exports.helpers = register(null);    