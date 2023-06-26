import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { Button } from "@mui/material";
import Switch, { SwitchProps } from '@mui/material/Switch';
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Doughnut, Pie } from "react-chartjs-2";
import { chartColors, labelArray, dataArray } from "../../Asset/data";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import "./Graph.css"
ChartJS.register(ArcElement, Tooltip, Legend);


const options = {
    legend: {
        display: false,
        position: "right"
    },
    elements: {
        arc: {
            borderWidth: 0
        }
    }
};

const pieOptions = {
    legend: {
        display: false,
        position: "right",
        // legendCallback: function (chart) {
        //     // Return the HTML string here.
        //     console.log(chart);
        //     return [
        //         <ul>
        //             <li>z</li>
        //             <li>zzzz</li>
        //             <li>ppp</li>
        //             <li>adasda</li>
        //         </ul>
        //     ];
        // }
    },
    elements: {
        arc: {
            borderWidth: 0
        }
    }
};

const data = {
    maintainAspectRatio: false,
    responsive: false,
    labels: labelArray,
    datasets: [
        {
            data: dataArray,
            backgroundColor: chartColors,
            hoverBackgroundColor: chartColors
        }
    ]
};


const pieData = {
    maintainAspectRatio: false,
    responsive: false,
    labels: ["usa", "europe", "africa"],
    datasets: [
        {
            data: [200, 150, 20, 10],
            backgroundColor: chartColors,
            hoverBackgroundColor: chartColors
        }
    ]
};

const AntSwitch = styled(Switch)(({ theme }) => ({
    width: 28,
    height: 16,
    padding: 0,
    display: 'flex',
    '&:active': {
        '& .MuiSwitch-thumb': {
            width: 15,
        },
        '& .MuiSwitch-switchBase.Mui-checked': {
            transform: 'translateX(9px)',
        },
    },
    '& .MuiSwitch-switchBase': {
        padding: 2,
        '&.Mui-checked': {
            transform: 'translateX(12px)',
            color: '#fff',
            '& + .MuiSwitch-track': {
                opacity: 1,
                backgroundColor: theme.palette.mode === 'dark' ? '#177ddc' : '#1890ff',
            },
        },
    },
    '& .MuiSwitch-thumb': {
        boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
        width: 12,
        height: 12,
        borderRadius: 6,
        transition: theme.transitions.create(['width'], {
            duration: 200,
        }),
    },
    '& .MuiSwitch-track': {
        borderRadius: 16 / 2,
        opacity: 1,
        backgroundColor:
            theme.palette.mode === 'dark' ? 'rgba(255,255,255,.35)' : 'rgba(0,0,0,.25)',
        boxSizing: 'border-box',
    },
}));

const styles = {
    pieContainer: {
        width: "40%",
        height: "40%",
        top: "50%",
        left: "50%",
        position: "absolute",
        transform: "translate(-50%, -50%)"
    },
    relative: {
        position: "relative"
    }
};

const Chart1 = () => {
    let chartInstance = null;
    const [graph, setGraph] = useState(false);
    // useEffect(() => {
    //   const legend = chartInstance.chartInstance.generateLegend();
    //   console.log(chartInstance, "textinput");
    //   console.log(legend);
    //   document.getElementById("legend").innerHTML = legend;
    // }, [chartInstance]);

    const toggleGraph = () => {
        console.log("bool", graph)
        setGraph(!graph)
    }

    return (
        <div className="App">
            <h1>Graph</h1>
            <div style={styles.relative}>
                {graph ? <Doughnut data={data} options={options} /> :
                    <Pie data={data} options={pieOptions}
                        ref={(input) => {
                            chartInstance = input;
                        }}
                    />}
                {/* <div id="legend" /> */}
            </div>


            <br /><br/>
            <Stack direction="row" spacing={1} alignItems="center">
                <Typography variant="h6" component="h1">Donught</Typography>
                <AntSwitch defaultChecked inputProps={{ 'aria-label': 'ant design' }} onClick={toggleGraph} style={{ margin: "auto" }} size="large" />
                <Typography variant="h6" component="h1">Pie</Typography>
            </Stack>
            {/* <Button variant="contained" size="medium" style={{ width: "100px", margin: "auto" }} onClick={toggleGraph}>Toogle</Button> */}
        </div>
    );
}



export default Chart1;
