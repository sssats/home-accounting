define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/home.tpl.html',
    'charts'
], function ($, _, Backbone, homeTemplate) {
    var HomeView = Backbone.View.extend({
        template: _.template(homeTemplate),
        initialize: function (options) {
            this.outgo = options.outgo;
            this.income = options.income;
        },
        drawChart: function (data, selector, title) {
            if (data.length > 0) {
                $(selector).highcharts({
                    chart: {
                        plotBackgroundColor: null,
                        plotBorderWidth: null,
                        plotShadow: false,
                        backgroundColor: '#f3f3f3'
                    },
                    title: {
                        text: title
                    },
                    tooltip: {
                        pointFormat: '<b>{point.y} руб.</b><br/><b>{point.percentage:.1f} %</b>'
                    },
                    plotOptions: {
                        pie: {
                            allowPointSelect: true,
                            cursor: 'pointer',
                            dataLabels: {
                                enabled: false
                            },
                            showInLegend: true
                        }
                    },
                    series: [
                        {
                            type: 'pie',
                            data: data
                        }
                    ]
                });
            }
        },
        render: function () {
            $('#main-content').html(this.template());
            this.drawChart(this.income, '#income-chart', 'Диаграмма доходов');
            this.drawChart(this.outgo, '#outgo-chart', 'Диаграмма расходов');
            return this;
        }
    });

    return HomeView;
});
