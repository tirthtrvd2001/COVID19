$(document).ready(function(){
    
    "use strict";
    $('body').css('min-height', 1.05*(window.innerHeight));
    
    $('#line').ready(function(){
        $('.preloader').delay(100).fadeOut('slow');
        $('.preloader-container').delay(400).fadeOut('slow'); 
    });
    
    if(window.innerWidth < 640){
        $('table').css('transform', 'scale('+ (window.innerWidth/640) +') translateX(1.1rem)');
        
        $('.block-2 .graphs').css('transform', 'translateY( -'+ ($('table').height()*(1 - (window.innerWidth/640))*40.7149) +'px)');
    }
    if(window.innerWidth < 580){
        $('table').css('transform', 'scale('+ (window.innerWidth/590) +') translateX(1.1rem)');
        
        $('.block-2 .graphs').css('transform', 'translateY( -'+ ($('table').height()*(1 - (window.innerWidth/590))*49.7149) +'px)');
    }
    if(window.innerWidth < 475){
        $('.block-1 ,line, .block-1 .doughnut').css({'flex': '0 0 ' + (window.innerWidth/475)*475 +'px', 'max-width': window.innerWidth/475*475 +'px' });
        
        $('.block-2 .line-graph').css('transform', 'scale('+ (window.innerWidth/470) +')');
    }
    console.log($('table').height());

//================== JSON data processing =============    
    $.getJSON("https://api.covid19india.org/data.json", function(data){
    $.getJSON("https://api.covid19india.org/states_daily.json", function(data2){
    
    $.getJSON("https://api.covid19india.org/state_district_wise.json", function(data3){    

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
        
        function least_50_floor(number, precision){
            number = parseFloat(number);
            if(!precision) return number;
            return (Math.floor(number / precision) * precision);
        } 
        
        $('.stats-block center .heading span').append( least_50_floor(total_deaths, 50));
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
        
// ===================== TIMESERIES =====================
        
        var dates = [];
        var date_confirmed = [];
        var date_daily_confirmed = [];
        var date_active = [];
        var date_recovered = [];
        var date_deceased = [];
        
        $.each(data.cases_time_series.slice(-28), function (id, obj) {
            dates.push(obj.date);
            date_daily_confirmed.push(obj.dailyconfirmed);
            date_confirmed.push(obj.totalconfirmed);
            date_active.push(obj.totalconfirmed - obj.totalrecovered - obj.totaldeceased);
            date_recovered.push(obj.totalrecovered);
            date_deceased.push(obj.totaldeceased);
        });
  
// ================== LANDING PAGE GRAPH ==================  
        
        Chart.defaults.global.defaultFontFamily = "Montserrat Medium";
        
// ======================== LINE CHART =======================        
        
        var ctx = document.getElementById("line");
        ctx.height = 200;
        
        var chartType = "line";
        var chartOpacity = "0";
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
                        borderColor: "rgba(0,123,255,.8)",
                        pointBackgroundColor: "rgba(0,123,255,.8)",
                        pointRadius: 2,
                        fill: false
                    },
                    {
                        data: date_recovered,
                        label: "Recovered",
                        lineTension: 0,
                        borderColor: "rgba(40,170,70,.8)",
                        pointBackgroundColor: "rgba(40,170,70,.8)",
                        pointRadius: 2,
                        fill: false 
                    },
                    {
                        data: date_active,
                        label: "Active",
                        lineTension: 0,
                        borderColor: "rgba(295,195,7,.7)",
                        pointBackgroundColor: "rgba(295,195,7,.7)",
                        pointRadius: 2,
                        fill: false
                    },
                    {
                        data: date_deceased,
                        label: "Deceased",
                        lineTension: 0,
                        borderColor: "rgba(223,53,70,.8)",
                        pointBackgroundColor: "rgba(223,53,70,.8)",
                        pointRadius: 2,
                        fill: false
                    }
                ]
            },
            options: {
                responsive: true,
                legend: {
                    position: 'bottom',
                    labels: {
                        boxWidth: 14,
                        fontSize: 14,
                        padding: 40
                    }
                    
                },
                scales: {
                    xAxes: [{
                        gridLines: {
                          drawOnChartArea: false  
                        },
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
                        gridLines: {
                            display: true
                        },
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
        
        if(window.innerWidth < 600){
            
            $('#line').remove();
            $('.line-graph').eq(0).append('<canvas id="line"></canvas>');
            var ctx = document.getElementById("line");
            ctx.height = 150;

            var chartType = "line";
            var chartOpacity = "0";
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
                            borderColor: "rgba(0,123,255,.8)",
                            pointBackgroundColor: "rgba(0,123,255,.8)",
                            pointRadius: 2,
                            fill: false
                        },
                        {
                            data: date_recovered,
                            label: "Recovered",
                            lineTension: 0,
                            borderColor: "rgba(40,170,70,.8)",
                            pointBackgroundColor: "rgba(40,170,70,.8)",
                            pointRadius: 2,
                            fill: false 
                        },
                        {
                            data: date_active,
                            label: "Active",
                            lineTension: 0,
                            borderColor: "rgba(295,195,7,.7)",
                            pointBackgroundColor: "rgba(295,195,7,.7)",
                            pointRadius: 2,
                            fill: false
                        },
                        {
                            data: date_deceased,
                            label: "Deceased",
                            lineTension: 0,
                            borderColor: "rgba(223,53,70,.8)",
                            pointBackgroundColor: "rgba(223,53,70,.8)",
                            pointRadius: 2,
                            fill: false
                        }
                    ]
                },
                options: {
                    responsive: true,
                    legend: {
                        display: false,
                        position: 'bottom',
                        labels: {
                            boxWidth: 14,
                            fontSize: 14,
                            padding: 40
                        }

                    },
                    scales: {
                        xAxes: [{
                            gridLines: {
                              drawOnChartArea: false  
                            },
                            ticks: {
                                display: false,
                                maxTicksLimit: 8,
                                padding: 10
                            }
                        }],
                        yAxes: [{
                            display: true,
                            gridLines: {
                                drawOnChartArea: false
                            },
                            ticks: {
                                display: true,
                                maxTicksLimit: 7,
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
            
        }
        
        if(window.innerWidth < 400){
            
            $('#line').remove();
            $('.line-graph').eq(0).append('<canvas id="line"></canvas>');
            var ctx = document.getElementById("line");
            ctx.height = 150;

            var chartType = "line";
            var chartOpacity = "0";
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
                            borderColor: "rgba(0,123,255,.8)",
                            borderWidth: 2,
                            pointBackgroundColor: "rgba(0,123,255,.8)",
                            pointRadius: 1.25,
                            fill: false
                        },
                        {
                            data: date_recovered,
                            label: "Recovered",
                            lineTension: 0,
                            borderColor: "rgba(40,170,70,.8)",
                            borderWidth: 1.5,
                            pointBackgroundColor: "rgba(40,170,70,.8)",
                            pointRadius: 1.25,
                            fill: false 
                        },
                        {
                            data: date_active,
                            label: "Active",
                            lineTension: 0,
                            borderColor: "rgba(295,195,7,.7)",
                            borderWidth: 1.5,
                            pointBackgroundColor: "rgba(295,195,7,.7)",
                            pointRadius: 1.25,
                            fill: false
                        },
                        {
                            data: date_deceased,
                            label: "Deceased",
                            lineTension: 0,
                            borderColor: "rgba(223,53,70,.8)",
                            borderWidth: 1.5,
                            pointBackgroundColor: "rgba(223,53,70,.8)",
                            pointRadius: 1.25,
                            fill: false
                        }
                    ]
                },
                options: {
                    responsive: true,
                    legend: {
                        display: false,
                        position: 'bottom',
                        labels: {
                            boxWidth: 14,
                            fontSize: 14,
                            padding: 40
                        }

                    },
                    scales: {
                        xAxes: [{
                            gridLines: {
                              display: false 
                            },
                            ticks: {
                                display: false,
                                maxTicksLimit: 8,
                                padding: 0
                            }
                        }],
                        yAxes: [{
                            display: true,
                            gridLines: {
                                drawOnChartArea: false
                            },
                            ticks: {
                                display: true,
                                maxTicksLimit: 7,
                                fontSize: 10,
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
            
        }
        
// =================== RATES DOUGHNUT CHART =================== 
        
        function doughnut_chart(state){
            if(state == "Total"){
                $('.doughnut-graph').parent().siblings('.heading').text('Case Rates - India');
            }
            else{
                $('.doughnut-graph').parent().siblings('.heading').text('Case Rates - ' + state);
            }
            
            $('#doughnut').remove();
            $('.doughnut-graph').append('<canvas id="doughnut"></canvas>');
            
           $('.doughnut-graph').parent().height(($('.doughnut-graph').parent().parent().height()) - ($('#doughnut').parent().parent().siblings('.heading').height()) - 100);
            
           var ctx = document.getElementById("doughnut").getContext('2d');
           var myChartDoughnut = new Chart(ctx, {
                type: 'doughnut',
                data: {
                    datasets: [{
                        data: [confirmed[states.indexOf(state)], recovered[states.indexOf(state)],
                       active[states.indexOf(state)], deaths[states.indexOf(state)]],
                        backgroundColor: ["#0074D9", "#28a745", "#ffc107", "#dc3545"]
                    }],
                    labels: ['Total Cases','Recovered','Active','Deceased']
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    aspectRatio: 1,
                    rotation : 180,
                    legend: {
                        display: false
                    }
                }
            }); 
        }
        var state = "Total";
        doughnut_chart(state);

// ======================= Daily Cases =====================    
        
        var daily_dates = [];
        var daily_confirmed = [];
        var daily_recovered = [];
        var daily_active = [];
        var daily_deceased = [];
        
        function removeDuplicates(array){
            return array.filter((a, b) => array.indexOf(a) === b)
        }
        function pushByStatusDateState(jsonObject, status, date, state, array) {
            state = state.toLowerCase();
            if(jsonObject['status'] == status && jsonObject['date'] == date){
                array.push(jsonObject[state]);
                return jsonObject[state];
            }
        }
        function filterByState(jsonObject, state){
            if(jsonObject['state'] == state)
                return jsonObject;
        }
        
        $.each(data.statewise,function(id,obj){
            if(id > 0){
                $('tbody').append('<tr class="font-theme-med color-grey new-state"><td class="text-left state py-2 pl-2"><span class="fa fa-caret-right"></span><span class="state-name">' + obj.state + '</span></td><td class="text-right py-2"><!--<small class="color-theme"><i class="fa fa-arrow-up"></i>'+ obj.deltaconfirmed +'</small>&nbsp;--><span class="total">'+   obj.confirmed +'</span></td><td class="text-right py-2"><span class="active">'+ obj.active +'</span></td><td class="text-right py-2"><span class="recovered">'+ obj.recovered +'</span></td><td class="text-right py-2 pr-2"><span class="deceased">'+ obj.deaths +'</span></td><br/></tr>');
            }
        });
        
        function daily_charts(state_cd){
            $('#daily-con-line, #daily-recover-line, #daily-death-line').remove();
            $('.line-graph').eq(1).append('<canvas id="daily-con-line"></canvas>');
            $('.line-graph').eq(2).append('<canvas id="daily-recover-line"></canvas>');
            $('.line-graph').eq(3).append('<canvas id="daily-death-line"></canvas>');
            
            daily_confirmed = [];
            daily_recovered = [];
            daily_deceased = [];
            $.each(data2.states_daily, function(id,obj){
                daily_dates.push(obj.date);
                daily_dates = removeDuplicates(daily_dates);
                
                $.each(daily_dates, function(id,date){
                    pushByStatusDateState(obj, "Confirmed", date, state_cd, daily_confirmed);
                    pushByStatusDateState(obj, "Recovered", date, state_cd, daily_recovered);
                    pushByStatusDateState(obj, "Deceased", date, state_cd, daily_deceased);
                });

            });
            
            var ctx = document.getElementById('daily-con-line').getContext('2d');

            var myChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: daily_dates,
                    datasets: [
                        {
                            data: daily_confirmed,
                            label: "Confirmed Cases",
                            lineTension: 0.3,
                            borderColor: "rgba(0,123,255,.8)",
                            pointBackgroundColor: "rgba(0,123,255,.8)",
                            pointRadius: 1.5,
                            fill: 'start',
                            backgroundColor: "rgba(0,123,255,.2)"
                        }
                    ]
                },
                options: {
                    responsive: true,
                    legend: {
                        display: false
                    },
                    scales: {
                        xAxes: [{
                            gridLines: {
                              drawOnChartArea: false  
                            },
                            ticks: {
                                maxTicksLimit: 8,
                                padding: 10
                            }
                        }],
                        yAxes: [{
                            display: true,
                            gridLines: {
                                drawOnChartArea: false
                            },
                            ticks: {
                                maxTicksLimit: 5,
                                padding: 10
                            }
                        }]
                    }
                }
            }); 

            var ctx = document.getElementById('daily-recover-line').getContext('2d');

            var myChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: daily_dates,
                    datasets: [
                        {
                            data: daily_recovered,
                            label: "Recovered Cases",
                            lineTension: .3,
                            borderColor: "rgba(40,170,70,.8)",
                            pointBackgroundColor: "rgba(40,170,70,.8)",
                            pointRadius: 1.5,
                            fill: 'start',
                            backgroundColor: "rgba(40,170,70,.2)"
                        }
                    ]
                },
                options: {
                    responsive: true,
                    legend: {
                        display: false
                    },
                    scales: {
                        xAxes: [{
                            gridLines: {
                              drawOnChartArea: false  
                            },
                            ticks: {
                                maxTicksLimit: 8,
                                padding: 10
                            }
                        }],
                        yAxes: [{
                            display: true,
                            gridLines: {
                                drawOnChartArea: false
                            },
                            ticks: {
                                maxTicksLimit: 5,
                                padding: 10
                            }
                        }]
                    }
                }
            });

            var ctx = document.getElementById('daily-death-line').getContext('2d');

            var myChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: daily_dates,
                    datasets: [
                        {
                            data: daily_deceased,
                            label: "Deceased Cases",
                            lineTension: 0.3,
                            borderColor: "rgba(223,53,70,.8)",
                            pointBackgroundColor: "rgba(223,53,70,.8)",
                            pointRadius: 1.5,
                            fill: 'start',
                            backgroundColor: "rgba(223,53,70,.2)"
                        }
                    ]
                },
                options: {
                    responsive: true,
                    legend: {
                        display: false
                    },
                    scales: {
                        xAxes: [{
                            gridLines: {
                              drawOnChartArea: false  
                            },
                            ticks: {
                                maxTicksLimit: 8,
                                padding: 10
                            }
                        }],
                        yAxes: [{
                            display: true,
                            gridLines: {
                                drawOnChartArea: false
                            },
                            ticks: {
                                maxTicksLimit: 5,
                                padding: 10
                            }
                        }]
                    }
                }
            });
            
            if(window.innerWidth < 550){
                
                var ctx = document.getElementById('daily-con-line').getContext('2d');
                var myChart = new Chart(ctx, {
                    type: 'line',
                    data: {
                        labels: daily_dates,
                        datasets: [
                            {
                                data: daily_confirmed,
                                label: "Confirmed Cases",
                                lineTension: 0.3,
                                borderColor: "rgba(0,123,255,.8)",
                                pointBackgroundColor: "rgba(0,123,255,.8)",
                                pointRadius: 1.5,
                                fill: 'start',
                                backgroundColor: "rgba(0,123,255,.2)"
                            }
                        ]
                    },
                    options: {
                        responsive: true,
                        legend: {
                            display: false
                        },
                        scales: {
                            xAxes: [{
                                gridLines: {
                                  drawOnChartArea: false  
                                },
                                ticks: {
                                    maxTicksLimit: 8,
                                    padding: 10,
                                    callback: function(label, index, labels){
                                        return label.substr(0,label.length-3);
                                    }
                                }
                            }],
                            yAxes: [{
                                display: true,
                                gridLines: {
                                    drawOnChartArea: false
                                },
                                ticks: {
                                    maxTicksLimit: 5,
                                    padding: 10
                                }
                            }]
                        }
                    }
                }); 

                var ctx = document.getElementById('daily-recover-line').getContext('2d');

                var myChart = new Chart(ctx, {
                    type: 'line',
                    data: {
                        labels: daily_dates,
                        datasets: [
                            {
                                data: daily_recovered,
                                label: "Recovered Cases",
                                lineTension: .3,
                                borderColor: "rgba(40,170,70,.8)",
                                pointBackgroundColor: "rgba(40,170,70,.8)",
                                pointRadius: 1.5,
                                fill: 'start',
                                backgroundColor: "rgba(40,170,70,.2)"
                            }
                        ]
                    },
                    options: {
                        responsive: true,
                        legend: {
                            display: false
                        },
                        scales: {
                            xAxes: [{
                                gridLines: {
                                  drawOnChartArea: false  
                                },
                                ticks: {
                                    maxTicksLimit: 8,
                                    padding: 10,
                                    callback: function(label, index, labels){
                                        return label.substr(0,label.length-3);
                                    }
                                }
                            }],
                            yAxes: [{
                                display: true,
                                gridLines: {
                                    drawOnChartArea: false
                                },
                                ticks: {
                                    maxTicksLimit: 5,
                                    padding: 10
                                }
                            }]
                        }
                    }
                });

                var ctx = document.getElementById('daily-death-line').getContext('2d');

                var myChart = new Chart(ctx, {
                    type: 'line',
                    data: {
                        labels: daily_dates,
                        datasets: [
                            {
                                data: daily_deceased,
                                label: "Deceased Cases",
                                lineTension: 0.3,
                                borderColor: "rgba(223,53,70,.8)",
                                pointBackgroundColor: "rgba(223,53,70,.8)",
                                pointRadius: 1.5,
                                fill: 'start',
                                backgroundColor: "rgba(223,53,70,.2)"
                            }
                        ]
                    },
                    options: {
                        responsive: true,
                        legend: {
                            display: false
                        },
                        scales: {
                            xAxes: [{
                                gridLines: {
                                  drawOnChartArea: false  
                                },
                                ticks: {
                                    maxTicksLimit: 8,
                                    padding: 10,
                                    callback: function(label, index, labels){
                                        return label.substr(0,label.length-3);
                                    }
                                }
                            }],
                            yAxes: [{
                                display: true,
                                gridLines: {
                                    drawOnChartArea: false
                                },
                                ticks: {
                                    maxTicksLimit: 5,
                                    padding: 10
                                }
                            }]
                        }
                    }
                });
                
            }
            if(window.innerWidth < 475){
                
                var ctx = document.getElementById('daily-con-line').getContext('2d');
                
                var myChart = new Chart(ctx, {
                    type: 'line',
                    data: {
                        labels: daily_dates,
                        datasets: [
                            {
                                data: daily_confirmed,
                                label: "Confirmed Cases",
                                lineTension: 0.3,
                                borderColor: "rgba(0,123,255,.8)",
                                pointBackgroundColor: "rgba(0,123,255,.8)",
                                pointRadius: 1.5,
                                fill: 'origin',
                                backgroundColor: "rgba(0,123,255,.2)"
                            }
                        ]
                    },
                    options: {
                        responsive: true,
                        legend: {
                            display: false
                        },
                        scales: {
                            xAxes: [{
                                gridLines: {
                                  drawOnChartArea: false
                                },
                                ticks: {
                                    maxTicksLimit: 8,
                                    padding: 10,
                                    fontSize: 9,
                                    callback: function(label, index, labels){
                                        return label.substr(0, label.length - 3);
                                    }
                                }
                            }],
                            yAxes: [{
                                display: true,
                                gridLines: {
                                    drawOnChartArea: false,
                                    beginAtZero: true,
                                    zeroLineColor: "rgba(0,0,0,.3)"
                                },
                                ticks: {
                                    maxTicksLimit: 5,
                                    padding: 10,
                                    fontSize: 10
                                }
                            }]
                        }
                    }
                }); 

                var ctx = document.getElementById('daily-recover-line').getContext('2d');

                var myChart = new Chart(ctx, {
                    type: 'line',
                    data: {
                        labels: daily_dates,
                        datasets: [
                            {
                                data: daily_recovered,
                                label: "Recovered Cases",
                                lineTension: .3,
                                borderColor: "rgba(40,170,70,.8)",
                                pointBackgroundColor: "rgba(40,170,70,.8)",
                                pointRadius: 1.5,
                                fill: 'start',
                                backgroundColor: "rgba(40,170,70,.2)"
                            }
                        ]
                    },
                    options: {
                        responsive: true,
                        legend: {
                            display: false
                        },
                        scales: {
                            xAxes: [{
                                gridLines: {
                                  drawOnChartArea: false
                                },
                                ticks: {
                                    maxTicksLimit: 8,
                                    padding: 10,
                                    fontSize: 9,
                                    callback: function(label, index, labels){
                                        return label.substr(0, label.length - 3);
                                    }
                                }
                            }],
                            yAxes: [{
                                display: true,
                                gridLines: {
                                    drawOnChartArea: false,
                                    beginAtZero: true,
                                    zeroLineColor: "rgba(0,0,0,.3)"
                                },
                                ticks: {
                                    maxTicksLimit: 5,
                                    padding: 10,
                                    fontSize: 10
                                }
                            }]
                        }
                    }
                });

                var ctx = document.getElementById('daily-death-line').getContext('2d');

                var myChart = new Chart(ctx, {
                    type: 'line',
                    data: {
                        labels: daily_dates,
                        datasets: [
                            {
                                data: daily_deceased,
                                label: "Deceased Cases",
                                lineTension: 0.3,
                                borderColor: "rgba(223,53,70,.8)",
                                pointBackgroundColor: "rgba(223,53,70,.8)",
                                pointRadius: 1.5,
                                fill: 'start',
                                backgroundColor: "rgba(223,53,70,.2)"
                            }
                        ]
                    },
                    options: {
                        responsive: true,
                        legend: {
                            display: false
                        },
                        scales: {
                            xAxes: [{
                                gridLines: {
                                  drawOnChartArea: false
                                },
                                ticks: {
                                    maxTicksLimit: 8,
                                    padding: 10,
                                    fontSize: 9,
                                    callback: function(label, index, labels){
                                        return label.substr(0, label.length - 3);
                                    }
                                }
                            }],
                            yAxes: [{
                                display: true,
                                gridLines: {
                                    drawOnChartArea: false,
                                    beginAtZero: true,
                                    zeroLineColor: "rgba(0,0,0,.3)"
                                },
                                ticks: {
                                    maxTicksLimit: 5,
                                    padding: 10,
                                    fontSize: 10
                                }
                            }]
                        }
                    }
                });
                
            }
            
        }
        
        var state_code = "TT";
        daily_charts(state_code);
        $('table tbody tr td.state span.fa').click(function(){
            if($(this).hasClass('fa-rotate-90')){
                $(this).removeClass('fa-rotate-90');
                $(this).parents('tr').nextAll('.state-dist').remove();
                $(this).siblings('.state-name').removeClass('font-theme-bold');
                $(this).parents('tr').removeClass('bg-light');
            }
            else{
                
                $(this).parents('tr').siblings('.new-state').find('.state span.fa').removeClass('fa-rotate-90');
                $(this).parents('tr').siblings('.new-state').removeClass('bg-light');
                $(this).parents('tr').siblings('.new-state').find('.state-name').removeClass('font-theme-bold');
                $(this).parents('tr').siblings('.state-dist').remove();
                
                var state_districts = [];
                var district_confirmed = [];
                var district_delta_confirmed = [];
                state = $(this).siblings('.state-name').text();
                console.log(state);
                
                $.each(data3[$(this).siblings('.state-name').text()], function(id, obj){
                    state_districts.push(Object.keys(obj));
                    
                });
                state_districts.pop();
                state_code = data3[$(this).siblings('.state-name').text()].statecode;
                state_code = state_code.toLowerCase();
                
                $.each(data3[$(this).siblings('.state-name').text()].districtData, function(id, obj){
                    district_confirmed.push(obj.confirmed);
                    district_delta_confirmed.push(obj.delta.confirmed);
                });
                
                $(this).addClass('fa-rotate-90');
                $(this).siblings('.state-name').addClass('font-theme-bold');
                $(this).parents('tr').addClass('bg-light');
                $(this).parents('tr').next().before('<tr class="font-theme-bold color-grey state-dist"><td class="text-left py-2" colspan="1">Districts</td><td class="text-right py-2">Confirmed</td></tr>');
                
                var delta = '';
                function difference(number){
                    if(number > 0){
                        delta = '<small class="color-theme"><i class="fa fa-arrow-up"></i>'+ number +'</small>&nbsp;&nbsp;';
                    }
                    else delta = "";
                }
                for(var dist in state_districts[0]){
                    
                    difference(district_delta_confirmed[dist]);
                    
                    $(this).parents('tr').nextAll('.new-state').first().before('<tr class="state-dist"><td class="text-left font-theme-med  color-grey py-1" colspan="1">'+ state_districts[0][dist] +'</td><td class="text-right font-theme-med color-grey py-1">'+ delta +'<span class="total">'+ district_confirmed[dist] +'</span></td><tr/>');
                }
                doughnut_chart(state);
                daily_charts(state_code);
            }
        });
       
    });    
    });    
    });    
})