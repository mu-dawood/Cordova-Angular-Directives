# Cordova-Angular-Directives
#Some helpfull directives that can be used with cordova angularjs projects
#its easy to use as below:
    1- you need to include module.js in your index.html page after including angularjs liberary

    2- in your app module include "CoDirectives" like that    
            var app = angular.module("YourApp",["CoDirectives"]);

    3-include the directive you need just after the module.js

#imageLoader
    this directive is for lazy loading images using your custom loader and custom default image in case the requested image not exists 
    
    just use it like that:
        <img image-loader image-src="src of your image" loader="image to used as loader" defualt-image="the default image">
     you can also bind angular variables

        <img image-loader image-src="{{src}}" loader="{{loader}}" defualt-image="{{default}}">    

#timeInterval
   avery helpfull directive to use on timing in thing like chat message,comments , etc

   we all have the proplem with showing people the time of the messages because of the diffrence between the server time and client local time so why not the server send us the diffrence between message time and current date in seconds as the two times are in server 
   we will got exact time 

   an example from c# :

      var  Interval = (DateTime.UtcNow - message.CreateDate).TotalSeconds;

    now when we got this value on angular we can pass this value to our directive and let it do all the work

    this directive is in two languages: english and arabic and support also custom text 

    ex: 
    in controller
        $scope.diffrence=5000;
        $scope.currentlanguage='ar';
        $scope.customtText={
                    now: 'just now',
                    two_second: 'two seconds',
                    more_seconds: '{more_seconds} seconds',
                    minute: 'one minute',
                    two_minutes: 'two minutes ago',
                    more_minutes: '{more_minutes} minutes',
                    hour: 'one hour',
                    two_hours: 'two hours',
                    more_hours: '{more_hours} hour',
                    day: 'yesterday',
                    two_days: 'two days ago',
                    more_days: '{more_days} days ago',
                    month: 'last month',
                    two_months: 'two months ago',
                    more_months: '{more_months} months ago',
                    year: 'last year',
                    two_years: 'two years ago',
                    more_years: '{more_years} years ago',
                };

    in html : <div time-interval="dateDiff" lang="currentlanguage"  custom-text="customtText"></div>

    


