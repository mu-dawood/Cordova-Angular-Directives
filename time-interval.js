
(function () {
    var app = angular.module("CoDirectives");
    app.directive('timeInterval', function ($http) {
        return {
            scope: {
                timeInterval: '=',
                lang: '=',
                customText: '='
            },
            restrict: 'AE',
            link: function (scope, element, attrs) {
                scope.toArabicDigits = function (value) {
                    var n = String(value);
                    arNumbers = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];
                    return n.replace(/[0-9]/g, function (w) {
                        return arNumbers[+w];
                    });
                }

                scope.textAr = {
                    now: 'الان',
                    two_second: 'منذ ثانيتين',
                    more_seconds: '{more_seconds} ثانية',
                    minute: 'منذ دقيقة',
                    two_minutes: 'منذ دقيقتين',
                    more_minutes: '{more_minutes} دقيقة',
                    hour: 'منذ ساعة',
                    two_hours: 'منذ ساعتين',
                    more_hours: 'منذ {more_hours} ساعة',
                    day: 'بالامس',
                    two_days: 'منذ يومين',
                    more_days: 'منذ {more_days} ايام',
                    month: 'منذ شهر',
                    two_months: 'منذ شهرين',
                    more_months: 'منذ {more_months} أشهر',
                    year: 'منذ عام',
                    two_years: 'منذ عامين',
                    more_years: 'منذ {more_years} أعوام',
                };
                scope.textEn = {
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

                scope.getText = function (key, sec) {
                    if (scope.customText)
                        return scope.customText[key].replace("{" + key + "}", sec);
                    else if (!scope.lang || scope.lang == 'ar') {
                        return scope.textAr[key].replace("{" + key + "}", scope.toArabicDigits(sec));
                    }
                    else
                        return scope.textEn[key].replace("{" + key + "}", sec);
                }


                if (!scope.timeInterval)
                    scope.timeInterval = 0;


                scope.render = function (seconds) {

                    var str = "";
                    if (seconds < 60) {
                        str = scope.getText("now")
                        //var numseconds = Math.floor(seconds);
                        //if (numseconds <= 1)
                        //    str = scope.getText("now", numseconds);
                        //else if (numseconds == 2)
                        //    str = scope.getText("two_second", numseconds);
                        //else
                        //    str = scope.getText("more_seconds", numseconds);
                    }
                    else if (seconds < (60 * 60)) {
                        var numminutes = Math.floor(seconds / 60);
                        if (numminutes <= 1)
                            str = scope.getText("minute", numminutes);
                        else if (numminutes == 2)
                            str = scope.getText("two_minutes", numminutes);
                        else
                            str = scope.getText("more_minutes", numminutes);
                    }
                    else if (seconds < (60 * 60 * 24)) {
                        var numhours = Math.floor(seconds / 3600);
                        if (numhours <= 1)
                            str = scope.getText("hour", numhours);
                        else if (numhours == 2)
                            str = scope.getText("two_hours", numhours);
                        else
                            str = scope.getText("more_hours", numhours);
                    }
                    else if (seconds < (60 * 60 * 24 * 30)) {
                        var numdays = Math.floor(seconds / 86400);
                        if (numdays <= 1)
                            str = scope.getText("day", numdays);
                        else if (numdays == 2)
                            str = scope.getText("two_days", numdays);
                        else
                            str = scope.getText("more_days", numdays);
                    }
                    else if (seconds < (60 * 60 * 24 * 30 * 12)) {
                        var nummonths = Math.floor(seconds / 2592000);
                        if (nummonths <= 1)
                            str = scope.getText("month", nummonths);
                        else if (nummonths == 2)
                            str = scope.getText("two_months", nummonths);
                        else
                            str = scope.getText("more_months", nummonths);
                    }
                    else {
                        var numyears = Math.floor(seconds / 31104000);
                        if (numyears <= 1)
                            str = scope.getText("year", numyears);
                        else if (numyears == 2)
                            str = scope.getText("two_years", numyears);
                        else
                            str = scope.getText("more_year", numyears);
                    }
                    try{
                        element.text(str);
                    }
                    catch (ex) {
                    }
                }
                scope.render(scope.timeInterval);

                var myVar = setInterval(function () {
                    scope.timeInterval++;
                    scope.render(scope.timeInterval);
                }, 1000);
            }
        };
    });

}());

