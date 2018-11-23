package at.lukle.clickableareas;

public class State{



    //var definitions


     {{#each gvariables}}

     {{type}} {{name}} = {{initialValue}}; 
     {{/each}}

     



    //empty constructor
    public State(){

    }



    //functions
    {{#each functions}}

    {{type}} {{name}} (){

        //write your function here
    }
    {{/each}}


    }













    //require js lib -- not possible
    




