$(window).on('beforeLoad', function(){
    $('body').hide();
    $('body').delay(500).fadeIn('slow');
})
$(document).ready(function () {
    "use strict";
    $('body').css('min-height', 1.05*(window.innerHeight));
    
    
//================== JSON data processing =============    
    $.getJSON("https://api.covid19india.org/data.json", function(data){
        
// ====================== STATEWISE ===================
        
        var states = [];
        var confirmed = [];
        var recovered = [];
        var active = [];
        var deaths = [];
        
        var total_confirmed = data.statewise[0].confirmed;
        var total_recovered = data.statewise[0].recovered;
        var total_deaths = data.statewise[0].deaths;
        var total_active = data.statewise[0].active;
        
        function least_100_floor(number, precision){
            number = parseFloat(number);
            if(!precision) return number;
            return (Math.floor(number / precision) * precision);
        } 
        
        $('.stats-block center .heading span').append( least_100_floor(total_deaths, 50));
        $('.case-info .total').append(total_confirmed);
        $('.case-info .recovered').append(total_recovered);
        $('.case-info .deaths').append(total_deaths);
        $('.case-info .active').append(total_active);
        
        
        $.each(data.statewise, function(id, obj){
            states.push(obj.state);
            confirmed.push(obj.confirmed);
            recovered.push(obj.recovered);
            active.push(obj.active);
            deaths.push(obj.deaths);
        });
        states.shift();
        confirmed.shift();
        recovered.shift();
        active.shift();
        deaths.shift();
        
// ===================== TIMESERIES =====================
        
        var dates = [];
        var date_confirmed = [];
        var date_daily_confirmed = [];
        var date_recovered = [];
        var date_deceased = [];
        
        $.each(data.cases_time_series.slice(-21), function (id, obj) {
            dates.push(obj.date);
            date_daily_confirmed.push(obj.dailyconfirmed);
            date_confirmed.push(obj.totalconfirmed);
            date_recovered.push(obj.totalrecovered);
            date_deceased.push(obj.totaldeceased);
        });
  
// ================== LANDING PAGE GRAPH ==================  
        
        Chart.defaults.global.defaultFontFamily = "Montserrat Medium";
            var ctx = document.getElementById("line").getContext('2d');
        
        var chartType = "line";
        var chartOpacity = ".15";
        $('#line').show().siblings().hide();
        var myChartLine = new Chart(ctx, {
            type: chartType,
            data: {
                labels: dates,
                datasets: [
                    {
                        data: date_confirmed,
                        label: "Total Cases",
                        lineTension: 0,
                        borderColor: "rgb(232,80,91)",
                        pointBackgroundColor: "rgb(232,80,91)",
                        fill: "start",
                        backgroundColor: "rgba(232,80,91," + chartOpacity + ")" 
                    },
                    {
                        data: date_recovered,
                        label: "Recovered",
                        lineTension: 0,
                        borderColor: "rgb(40,170,70)",
                        pointBackgroundColor: "rgb(40,170,70)",
                        fill: "start",
                        backgroundColor: "rgba(40,170,70," + chartOpacity + ")" 
                    }
                ]
            },
            options: {
                responsive: true,
                scales: {
                    xAxes: [{
                        ticks: {
                            maxTicksLimit: 8,
                            callback: function(label, index, labels) {

                            var d = new Date(label);
                            function formatDate(date) { 
                                var day = date.getDate(); 
                                if (day < 10) { 
                                    day = "0" + day; 
                                } 
                                var month = date.getMonth() + 1; 
                                if (month < 10) { 
                                    month = "0" + month; 
                                } 
                                var year = date.getFullYear(); 
                                return day + "-" + month; 
                            }
                            var date = formatDate(d);
                            return label;
                            },
                            padding: 10
                        }
                    }],
                    yAxes: [{
                        display: true,
                        ticks: {
                            maxTicksLimit: 10,
                            callback: function(label, index, labels) {
                                if(label == 0) label = "0";
                                else label = (((label.toString()).slice(0,-3)) + 'k');
                                return label;
                            },
                            padding: 10
                        }
                    }]
                }
            }
        });
        
        $('.line').click(function(){
            $(this).addClass("active").siblings().removeClass("active");
            $('#line').show().siblings().hide();
            chartType = "line";
            chartOpacity = ".15";
            var ctx = document.getElementById("line").getContext('2d');
            var myChartLine = new Chart(ctx, {
            type: chartType,
            data: {
                labels: dates,
                datasets: [
                    {
                        data: date_confirmed,
                        label: "Total Cases",
                        lineTension: 0,
                        borderColor: "rgb(232,80,91)",
                        pointBackgroundColor: "rgb(232,80,91)",
                        fill: "start",
                        backgroundColor: "rgba(232,80,91," + chartOpacity + ")" 
                    },
                    {
                            data: date_recovered,
                            label: "Recovered",
                            lineTension: 0,
                            borderColor: "rgb(40,170,70)",
                            pointBackgroundColor: "rgb(40,170,70)",
                            fill: "start",
                            backgroundColor: "rgba(40,170,70," + chartOpacity + ")" 
                        }
                ]
            },
            options: {
                responsive: true,
                scales: {
                    xAxes: [{
                        ticks: {
                            maxTicksLimit: 8,
                            callback: function(label, index, labels) {

                            var d = new Date(label);
                            function formatDate(date) { 
                                var day = date.getDate(); 
                                if (day < 10) { 
                                    day = "0" + day; 
                                } 
                                var month = date.getMonth() + 1; 
                                if (month < 10) { 
                                    month = "0" + month; 
                                } 
                                var year = date.getFullYear(); 
                                return day + "-" + month; 
                            }
                            var date = formatDate(d);
                            return label;
                            },
                            padding: 10
                        }
                    }],
                    yAxes: [{
                        display: true,
                        ticks: {
                            maxTicksLimit: 10,
                            callback: function(label, index, labels) {
                                if(label == 0) label = "0";
                                else label = (((label.toString()).slice(0,-3)) + 'k');
                                return label;
                            },
                            padding: 10
                        }
                    }]
                }
            }
        });
        });
        $('.graph .btn-wrap .bar').on("click", function(){
            $(this).addClass("active").siblings().removeClass("active");
            $('#bar').show().siblings().hide();
            chartType = "bar";
            chartOpacity = ".75"; 
            var ctx = document.getElementById("bar").getContext('2d');
            var myChartBar = new Chart(ctx, {
            type: chartType,
            data: {
                labels: dates,
                datasets: [
                    {
                        data: date_confirmed,
                        label: "Total Cases",
                        lineTension: 0,
                        borderColor: "rgb(232,80,91)",
                        borderWidth : 2,
                        pointBackgroundColor: "rgb(232,80,91)",
                        fill: "start",
                        backgroundColor: "rgba(232,80,91," + chartOpacity + ")" 
                    },
                    {
                        data: date_recovered,
                        label: "Recovered",
                        lineTension: 0,
                        borderColor: "rgb(40,170,70)",
                        borderWidth : 2,
                        pointBackgroundColor: "rgb(40,170,70)",
                        fill: "start",
                        backgroundColor: "rgba(40,170,70," + chartOpacity + ")" 
                    }
                ]
            },
            options: {
                responsive: true,
                scales: {
                    xAxes: [{
                        ticks: {
                            maxTicksLimit: 8,
                            callback: function(label, index, labels) {

                            var d = new Date(label);
                            function formatDate(date) { 
                                var day = date.getDate(); 
                                if (day < 10) { 
                                    day = "0" + day; 
                                } 
                                var month = date.getMonth() + 1; 
                                if (month < 10) { 
                                    month = "0" + month; 
                                } 
                                var year = date.getFullYear(); 
                                return day + "-" + month; 
                            }
                            var date = formatDate(d);
                            return label;
                            },
                            padding: 10
                        }
                    }],
                    yAxes: [{
                        display: true,
                        ticks: {
                            maxTicksLimit: 10,
                            callback: function(label, index, labels) {
                                if(label == 0) label = "0";
                                else label = (((label.toString()).slice(0,-3)) + 'k');
                                return label;
                            },
                            padding: 10
                        }
                    }]
                }
            }
        });
        });
        $('.daily').click(function(){
            $(this).addClass("active").siblings().removeClass("active");
            $('#line-daily').show().siblings().hide();
            chartType = "line";
            chartOpacity = ".15";
            var ctx = document.getElementById("line-daily").getContext('2d');
            var myChartLine = new Chart(ctx, {
            type: chartType,
            data: {
                labels: dates,
                datasets: [
                    {
                        data: date_daily_confirmed,
                        label: "Daily Confirmed Cases",
                        lineTension: 0,
                        borderColor: "rgb(0,123,255)",
                        pointBackgroundColor: "rgb(0,123,255)",
                        fill: "start",
                        backgroundColor: "rgba(0,123,255," + chartOpacity + ")" 
                    }
                ]
            },
            options: {
                responsive: true,
                scales: {
                    xAxes: [{
                        ticks: {
                            maxTicksLimit: 8,
                            callback: function(label, index, labels) {

                            var d = new Date(label);
                            function formatDate(date) { 
                                var day = date.getDate(); 
                                if (day < 10) { 
                                    day = "0" + day; 
                                } 
                                var month = date.getMonth() + 1; 
                                if (month < 10) { 
                                    month = "0" + month; 
                                } 
                                var year = date.getFullYear(); 
                                return day + "-" + month; 
                            }
                            var date = formatDate(d);
                            return label;
                            },
                            padding: 10
                        }
                    }],
                    yAxes: [{
                        display: true,
                        ticks: {
                            maxTicksLimit: 10,
                            padding: 10
                        }
                    }]
                }
            }
        });
        });
        
        
        $('select').change(function(){

           if($('select option:selected').text() === 'India'){
            
            $('.case-info .total').text(total_confirmed);
            $('.case-info .recovered').text(total_recovered);
            $('.case-info .deaths').text(total_deaths);
            $('.case-info .active').text(total_active);   
            $('.btn-wrap .line').addClass('active').siblings().removeClass('active');
            $('.btn-wrap').css({'opacity' : 1, 'pointer-events': 'all'});
            var chartType = "line";
            var chartOpacity = ".15";
            
            $('#line').show().siblings().hide();
                chartType = "line";
                chartOpacity = ".15";
                var ctx = document.getElementById("line").getContext('2d');
                var myChartLine = new Chart(ctx, {
                type: chartType,
                data: {
                    labels: dates,
                    datasets: [
                        {
                            data: date_confirmed,
                            label: "Total Cases",
                            lineTension: 0,
                            borderColor: "rgb(232,80,91)",
                            pointBackgroundColor: "rgb(232,80,91)",
                            fill: "start",
                            backgroundColor: "rgba(232,80,91," + chartOpacity + ")" 
                        },
                        {
                                data: date_recovered,
                                label: "Recovered",
                                lineTension: 0,
                                borderColor: "rgb(40,170,70)",
                                pointBackgroundColor: "rgb(40,170,70)",
                                fill: "start",
                                backgroundColor: "rgba(40,170,70," + chartOpacity + ")" 
                            }
                    ]
                },
                options: {
                    responsive: true,
                    scales: {
                        xAxes: [{
                            ticks: {
                                maxTicksLimit: 8,
                                callback: function(label, index, labels) {

                                var d = new Date(label);
                                function formatDate(date) { 
                                    var day = date.getDate(); 
                                    if (day < 10) { 
                                        day = "0" + day; 
                                    } 
                                    var month = date.getMonth() + 1; 
                                    if (month < 10) { 
                                        month = "0" + month; 
                                    } 
                                    var year = date.getFullYear(); 
                                    return day + "-" + month; 
                                }
                                var date = formatDate(d);
                                return label;
                                },
                                padding: 10
                            }
                        }],
                        yAxes: [{
                            display: true,
                            ticks: {
                                maxTicksLimit: 10,
                                callback: function(label, index, labels) {
                                    if(label == 0) label = "0";
                                    else label = (((label.toString()).slice(0,-3)) + 'k');
                                    return label;
                                },
                                padding: 10
                            }
                        }]
                    }
                }
            });
               
            $('.line').click(function(){
                $(this).addClass("active").siblings().removeClass("active");
                $('#line').show().siblings().hide();;
                chartType = "line";
                chartOpacity = ".15";
                var ctx = document.getElementById("line").getContext('2d');
                var myChartLine = new Chart(ctx, {
                type: chartType,
                data: {
                    labels: dates,
                    datasets: [
                        {
                            data: date_confirmed,
                            label: "Total Cases",
                            lineTension: 0,
                            borderColor: "rgb(232,80,91)",
                            pointBackgroundColor: "rgb(232,80,91)",
                            fill: "start",
                            backgroundColor: "rgba(232,80,91," + chartOpacity + ")" 
                        },
                        {
                                data: date_recovered,
                                label: "Recovered",
                                lineTension: 0,
                                borderColor: "rgb(40,170,70)",
                                pointBackgroundColor: "rgb(40,170,70)",
                                fill: "start",
                                backgroundColor: "rgba(40,170,70," + chartOpacity + ")" 
                            }
                    ]
                },
                options: {
                    responsive: true,
                    scales: {
                        xAxes: [{
                            ticks: {
                                maxTicksLimit: 8,
                                callback: function(label, index, labels) {

                                var d = new Date(label);
                                function formatDate(date) { 
                                    var day = date.getDate(); 
                                    if (day < 10) { 
                                        day = "0" + day; 
                                    } 
                                    var month = date.getMonth() + 1; 
                                    if (month < 10) { 
                                        month = "0" + month; 
                                    } 
                                    var year = date.getFullYear(); 
                                    return day + "-" + month; 
                                }
                                var date = formatDate(d);
                                return label;
                                },
                                padding: 10
                            }
                        }],
                        yAxes: [{
                            display: true,
                            ticks: {
                                maxTicksLimit: 10,
                                callback: function(label, index, labels) {
                                    if(label == 0) label = "0";
                                    else label = (((label.toString()).slice(0,-3)) + 'k');
                                    return label;
                                },
                                padding: 10
                            }
                        }]
                    }
                }
            });
            });
            $('.graph .btn-wrap .bar').on("click", function(){
               $('#bar').show().siblings().hide();; $(this).addClass("active").siblings().removeClass("active");

                chartType = "bar";
                chartOpacity = ".75"; 
                var ctx = document.getElementById("bar").getContext('2d');
                var myChartBar = new Chart(ctx, {
                type: chartType,
                data: {
                    labels: dates,
                    datasets: [
                        {
                            data: date_confirmed,
                            label: "Total Cases",
                            lineTension: 0,
                            borderColor: "rgb(232,80,91)",
                            borderWidth : 3,
                            pointBackgroundColor: "rgb(232,80,91)",
                            fill: "start",
                            backgroundColor: "rgba(232,80,91," + chartOpacity + ")" 
                        },
                        {
                            data: date_recovered,
                            label: "Recovered",
                            lineTension: 0,
                            borderColor: "rgb(40,170,70)",
                            borderWidth : 3,
                            pointBackgroundColor: "rgb(40,170,70)",
                            fill: "start",
                            backgroundColor: "rgba(40,170,70," + chartOpacity + ")" 
                        }
                    ]
                },
                options: {
                    responsive: true,
                    scales: {
                        xAxes: [{
                            ticks: {
                                maxTicksLimit: 8,
                                callback: function(label, index, labels) {

                                var d = new Date(label);
                                function formatDate(date) { 
                                    var day = date.getDate(); 
                                    if (day < 10) { 
                                        day = "0" + day; 
                                    } 
                                    var month = date.getMonth() + 1; 
                                    if (month < 10) { 
                                        month = "0" + month; 
                                    } 
                                    var year = date.getFullYear(); 
                                    return day + "-" + month; 
                                }
                                var date = formatDate(d);
                                return label;
                                },
                                padding: 10
                            }
                        }],
                        yAxes: [{
                            display: true,
                            ticks: {
                                maxTicksLimit: 10,
                                callback: function(label, index, labels) {
                                    if(label == 0) label = "0";
                                    else label = (((label.toString()).slice(0,-3)) + 'k');
                                    return label;
                                },
                                padding: 10
                            }
                        }]
                    }
                }
            });
            });
            $('.daily').click(function(){
            $(this).addClass("active").siblings().removeClass("active");
            $('#line-daily').show().siblings().hide();
            chartType = "line";
            chartOpacity = ".15";
            var ctx = document.getElementById("line-daily").getContext('2d');
            var myChartLine = new Chart(ctx, {
            type: chartType,
            data: {
                labels: dates,
                datasets: [
                    {
                        data: date_daily_confirmed,
                        label: "Daily Confirmed Cases",
                        lineTension: 0,
                        borderColor: "rgb(0,123,255)",
                        pointBackgroundColor: "rgb(0,123,255)",
                        fill: "start",
                        backgroundColor: "rgba(0,123,255," + chartOpacity + ")" 
                    }
                ]
            },
            options: {
                responsive: true,
                scales: {
                    xAxes: [{
                        ticks: {
                            maxTicksLimit: 8,
                            callback: function(label, index, labels) {

                            var d = new Date(label);
                            function formatDate(date) { 
                                var day = date.getDate(); 
                                if (day < 10) { 
                                    day = "0" + day; 
                                } 
                                var month = date.getMonth() + 1; 
                                if (month < 10) { 
                                    month = "0" + month; 
                                } 
                                var year = date.getFullYear(); 
                                return day + "-" + month; 
                            }
                            var date = formatDate(d);
                            return label;
                            },
                            padding: 10
                        }
                    }],
                    yAxes: [{
                        display: true,
                        ticks: {
                            maxTicksLimit: 10,
                            padding: 10
                        }
                    }]
                }
            }
        });
        });
        }
        else{
             
           var state = $("select option:selected").text();
            
           $('.case-info .total').text(confirmed[states.indexOf(state)]);
           $('.case-info .recovered').text(recovered[states.indexOf(state)]);
           $('.case-info .deaths').text(deaths[states.indexOf(state)]);
           $('.case-info .active').text(active[states.indexOf(state)]);
            
           $('#doughnut').show().siblings().hide();
           $('#doughnut').remove();
           $('#bar').after('<canvas id="doughnut"></canvas>');
           $('.btn-wrap .line').addClass('active').siblings().removeClass('active');
           $('.btn-wrap').css({'opacity': 0.5 , 'pointer-events': 'none'});
               
           var ctx = document.getElementById("doughnut").getContext('2d');
           var myChartDoughnut = new Chart(ctx, {
            type: 'doughnut',
            data: {
                datasets: [{
                    label: 'Colors',
                    data: [confirmed[states.indexOf(state)], recovered[states.indexOf(state)],
                   active[states.indexOf(state)], deaths[states.indexOf(state)]],
                    backgroundColor: ["#0074D9", "#28a745", "#ffc107", "#dc3545"]
                }],
                labels: ['Total Cases','Recovered','Active','Deaths']
            },
            options: {
                responsive: true,
                title:{
                    display: true,
                    text: "Data of " + state,
                    fontSize: 14
                }
            }
        });
        }
        }); 
        
        if(window.innerWidth < 576){
            myChartLine.destroy();
            $('#mob-line').show().siblings().hide();
            
            var ctx = document.getElementById("mob-line").getContext('2d');
            var myChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: dates,
                    datasets: [
                        {
                            data: date_confirmed,
                            label: "Total Cases",
                            lineTension: 0,
                            borderColor: "rgb(232,80,91)",
                            borderWidth: 1.5,
                            pointRadius: 1.5,
                            pointBackgroundColor: "rgb(232,80,91)",
                            fill: false
                        },
                        {
                            data: date_recovered,
                            label: "Recovered",
                            lineTension: 0,
                            borderColor: "rgb(40,170,70)",
                            borderWidth: 1.5,
                            pointRadius: 1.5,
                            pointBackgroundColor: "rgb(40,170,70)",
                            fill: false
                        }
                    ]
                },
                options: {
                    responsive: true,
                    legend: {
                        display: false,
                        labels: {
                            boxWidth: 60
                        }
                    },
                    scales: {
                        xAxes: [{
                            gridLines: {
                                display: false,
                            },
                            ticks: {
                                display: false
                            }
                        }],
                        yAxes: [{
                            display: true,
                            gridLines: {
                                display: false,
                            },
                            ticks: {
                                maxTicksLimit: 7,
                                display: false,
                                fontSize: 9
                            }
                        }]
                    }
                }
            });
            
            $('select').change(function(){

           if($('select option:selected').text() === 'India'){
            $('.btn-wrap').css({'opacity' : 1, 'pointer-events': 'all'});
            $('#mob-line').show().siblings().hide(); 
               
            var chartType = "line";
            var chartOpacity = ".15"; 
            
            var ctx = document.getElementById("mob-line").getContext('2d');
            var myChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: dates,
                    datasets: [
                        {
                            data: date_confirmed,
                            label: "Total Cases",
                            lineTension: 0,
                            borderColor: "rgb(232,80,91)",
                            borderWidth: 1.5,
                            pointRadius: 1.5,
                            pointBackgroundColor: "rgb(232,80,91)",
                            fill: false
                        },
                        {
                            data: date_recovered,
                            label: "Recovered",
                            lineTension: 0,
                            borderColor: "rgb(40,170,70)",
                            borderWidth: 1.5,
                            pointRadius: 1.5,
                            pointBackgroundColor: "rgb(40,170,70)",
                            fill: false
                        }
                    ]
                },
                options: {
                    responsive: true,
                    legend: {
                        display: false,
                        labels: {
                            boxWidth: 60
                        }
                    },
                    scales: {
                        xAxes: [{
                            gridLines: {
                                display: false,
                            },
                            ticks: {
                                display: false
                            }
                        }],
                        yAxes: [{
                            display: true,
                            gridLines: {
                                display: false
                            },
                            ticks: {
                                maxTicksLimit: 8,
                                display: false
                            }
                        }]
                    }
                }
            });
           }
           else{
               var state = $("select option:selected").text();
           $('#doughnut').show().siblings().hide();
           $('#doughnut').remove();
           $('#bar').after('<canvas id="doughnut"></canvas>');
           $('.btn-wrap .line').addClass('active').siblings().removeClass('active');
           $('.btn-wrap').css({'opacity': 0.5 , 'pointer-events': 'none'});
               
           var ctx = document.getElementById("doughnut").getContext('2d');
           myChartDoughnut    
           var myChartDoughnut = new Chart(ctx, {
            type: 'doughnut',
            data: {
                datasets: [{
                    label: 'Colors',
                    data: [confirmed[states.indexOf(state)], recovered[states.indexOf(state)],
                   active[states.indexOf(state)], deaths[states.indexOf(state)]],
                    backgroundColor: ["#0074D9", "#28a745", "#ffc107", "#dc3545"]
                }],
                labels: ['Total Cases','Recovered','Active','Deaths']
            },
            options: {
                legend: {
                    display: false
                },
                responsive: true,
                title:{
                    display: true,
                    text: "Data of " + state,
                    fontSize: 14
                }
            }
        });
        }
            });
        }
        
    });

// ==================== JSON COmplete ====================
    
    ScrollOut({
    targets: '.img-container, .block-1 div, .block-2 div, .block-3 div, .block-4 div, .block-5 div, .stats-block div, .book-test-block div'
    });
    
    $( ".btn-red" ).click(function( event ) {
        event.preventDefault();
        $("html, body").animate({ scrollTop: $($(this).data("href")).offset().top }, 800, 'swing');
    });
    $( ".navbar a" ).not(':last').click(function( event ) {
        event.preventDefault();
        $("html, body").animate({ scrollTop: $($(this).attr("href")).offset().top }, 800, 'swing');
    });
    
});

