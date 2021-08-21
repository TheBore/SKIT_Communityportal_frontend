import React, {Component} from "react";
import PublicDocumentsRegistryRepository from "../../repository/PublicDocumentsRegistryRepository";
import {toast} from "react-toastify";
import {strings} from "../../Localization/Localization";
import './css/Monitoring.css'
import ReactApexChart from "react-apexcharts";


class Monitoring extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            curentYearNo: null,
            curentYearYes: 0,
            nextYearYes: 0,
            nextYearNo: 0,
            furtherYearnNo: 0,
            furtherYearnYes: 0,
            series: [{
                name: strings.no,
                data: []
            }, {
                name: strings.yes,
                data: []
            }],
            options: {
                colors: ['#dc3545', 'steelblue'],
                chart: {
                    type: 'bar',
                    height: 250,
                    width: '80%'
                },
                plotOptions: {
                    bar: {
                        horizontal: true,
                    }
                },
                dataLabels: {
                    enabled: false,
                },
                xaxis: {
                    categories: [],
                    // categories: ['2020','2019','2018'],

                }
            },
        };
    }


    componentDidMount() {
        this.fetchData();
    }

    fetchData = () => {
        PublicDocumentsRegistryRepository.monitoring().then(res => {

            let serieslet = []
            let data1 = []
            let data2 = []
            let years = []
            let objYes = {}
            let objNo = {}
            if (Object.keys(res.data[0].count).length !== 0 || Object.keys(res.data[1].count).length !== 0 || Object.keys(res.data[2].count).length !== 0) {
                data1.push(res.data[0].count.no, res.data[1].count.no, res.data[2].count.no)
                data2.push(res.data[0].count.yes, res.data[1].count.yes, res.data[2].count.yes)
            }
            objNo.data = data1
            objYes.data = data2
            serieslet.push(objNo, objYes)
            this.setState({
                data: res.data,
                currentYearNo: Object.keys(res.data[0].count).length !== 0 ? res.data[0].count.no : 0,
                currentYearYes: Object.keys(res.data[0].count).length !== 0 ? res.data[0].count.yes : 0,
                nextYearNo: Object.keys(res.data[1].count).length !== 0 ? res.data[1].count.no : 0,
                nextYearYes: Object.keys(res.data[1].count).length !== 0 ? res.data[1].count.yes : 0,
                furtherYearNo: Object.keys(res.data[2].count).length !== 0 ? res.data[2].count.no : 0,
                furtherYearYes: Object.keys(res.data[2].count).length !== 0 ? res.data[2].count.yes : 0,
                series: serieslet
            })
            for (let key of Object.keys(res.data)) {
                years.push(res.data[key].year.toString())
            }
            this.setState(prevState => ({
                ...prevState,
                options: {
                    ...prevState.options,
                    xaxis: {
                        ...prevState.xaxis,
                        categories: years
                    }
                }
            }))
        }).catch(() => {
            toast.error(strings.error)
        })
    }

    render() {


        return (
            <div className="container">
                <h2 style={{textAlign: "left", color: "#1C4857"}}
                    className="mt-4 ml-3">{strings.questionMonitoring} ?</h2>
                <div className="row mt-3 mb-3">
                    <div className="col-12" id="box">
                        {this.state.options.length !== 0 && this.state.series.length !== 0 ? <ReactApexChart
                            options={this.state.options}
                            series={this.state.series}
                            type="bar"
                            height={'350'}
                            width={'100%'}/> : null}
                    </div>

                </div>
            </div>
        )

    }

}

export default Monitoring;
