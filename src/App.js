import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import React from "react";
import ReactDOM from "react-dom";
import { BehaviorSubject } from 'rxjs';
//import * as d3 from "d3";

import "./styles.css";

function debounce(fn, delay) {
    var timer = null;
    return function () {
        var context = this, args = arguments;
        clearTimeout(timer);
        timer = setTimeout(function () {
            fn.apply(context, args);
        }, delay);
    };
}

var data = [
    [
        1539447300.0,
        1539449100.0
    ],
    [
        1539450900.0,
        1539458100.0
    ],
    [
        1539448200.0,
        1539460800.0
    ],
    [
        1539448200.0,
        1539471600.0
    ],
    [
        1539456300.0,
        1539465300.0
    ],
    [
        1539460800.0,
        1539469800.0
    ],
    [
        1539476100.0,
        1539483300.0
    ],
    [
        1539473400.0,
        1539491400.0
    ],
    [
        1539479700.0,
        1539488700.0
    ],
    [
        1539490500.0,
        1539513900.0
    ],
    [
        1539523800.0,
        1539531000.0
    ],
    [
        1539535500.0,
        1539542700.0
    ],
    [
        1539558000.0,
        1539567000.0
    ],
    [
        1539566100.0,
        1539575100.0
    ],
    [
        1539624600.0,
        1539631800.0
    ],
    [
        1539636300.0,
        1539643500.0
    ],
    [
        1539648900.0,
        1539659700.0
    ],
    [
        1539642600.0,
        1539671400.0
    ],
    [
        1539690300.0,
        1539704700.0
    ],
    [
        1539684900.0,
        1539711900.0
    ],
    [
        1539696600.0,
        1539712800.0
    ],
    [
        1539705600.0,
        1539711000.0
    ],
    [
        1539702000.0,
        1539716400.0
    ],
    [
        1539641700.0,
        1539780300.0
    ],
    [
        1539719100.0,
        1539729900.0
    ],
    [
        1539711000.0,
        1539739800.0
    ],
    [
        1539735300.0,
        1539751500.0
    ],
    [
        1539721800.0,
        1539766800.0
    ],
    [
        1539811800.0,
        1539819000.0
    ],
    [
        1539813600.0,
        1539822600.0
    ],
    [
        1539819000.0,
        1539822600.0
    ],
    [
        1539812700.0,
        1539839700.0
    ],
    [
        1539828000.0,
        1539842400.0
    ],
    [
        1539840600.0,
        1539853200.0
    ],
    [
        1539827100.0,
        1539870300.0
    ],
    [
        1539858600.0,
        1539862200.0
    ],
    [
        1539870300.0,
        1539891900.0
    ],
    [
        1539889200.0,
        1539912600.0
    ],
    [
        1539850500.0,
        1539963900.0
    ],
    [
        1539910800.0,
        1539954000.0
    ],
    [
        1539962100.0,
        1539978300.0
    ],
    [
        1539963000.0,
        1539979200.0
    ],
    [
        1539966600.0,
        1539979200.0
    ],
    [
        1539990000.0,
        1539999000.0
    ],
    [
        1540000800.0,
        1540006200.0
    ],
    [
        1540034100.0,
        1540055700.0
    ],
    [
        1540062900.0,
        1540070100.0
    ],
    [
        1540066500.0,
        1540080900.0
    ],
    [
        1540003500.0,
        1540147500.0
    ],
    [
        1540104300.0,
        1540107900.0
    ],
    [
        1540149300.0,
        1540188900.0
    ],
    [
        1540171800.0,
        1540179000.0
    ],
    [
        1540176300.0,
        1540185300.0
    ],
    [
        1540242900.0,
        1540255500.0
    ],
    [
        1540253700.0,
        1540259100.0
    ],
    [
        1540256400.0,
        1540258200.0
    ],
    [
        1540254600.0,
        1540260000.0
    ],
    [
        1540256400.0,
        1540261800.0
    ],
    [
        1540237500.0,
        1540293300.0
    ],
    [
        1540272600.0,
        1540287000.0
    ],
    [
        1540296900.0,
        1540325700.0
    ],
    [
        1540304100.0,
        1540352700.0
    ],
    [
        1540340100.0,
        1540347300.0
    ],
    [
        1540338300.0,
        1540354500.0
    ],
    [
        1540336500.0,
        1540361700.0
    ],
    [
        1540390500.0,
        1540399500.0
    ],
    [
        1540403100.0,
        1540415700.0
    ],
    [
        1540417500.0,
        1540419300.0
    ],
    [
        1540414800.0,
        1540436400.0
    ],
    [
        1540471500.0,
        1540482300.0
    ],
    [
        1540474200.0,
        1540506600.0
    ],
    [
        1540500300.0,
        1540511100.0
    ],
    [
        1540523700.0,
        1540527300.0
    ],
    [
        1540579500.0,
        1540586700.0
    ],
    [
        1540580400.0,
        1540587600.0
    ],
    [
        1540617300.0,
        1540642500.0
    ],
    [
        1540658700.0,
        1540665900.0
    ],
    [
        1540658700.0,
        1540680300.0
    ],
    [
        1540679400.0,
        1540686600.0
    ],
    [
        1540691100.0,
        1540718100.0
    ],
    [
        1540696500.0,
        1540727100.0
    ],
    [
        1540728000.0,
        1540737000.0
    ],
    [
        1540737000.0,
        1540746000.0
    ],
    [
        1540683000.0,
        1540819800.0
    ],
    [
        1540742400.0,
        1540762200.0
    ],
    [
        1540763100.0,
        1540770300.0
    ],
    [
        1540769400.0,
        1540773000.0
    ],
    [
        1540769400.0,
        1540789200.0
    ],
    [
        1540824300.0,
        1540827900.0
    ],
    [
        1540827900.0,
        1540831500.0
    ],
    [
        1540862100.0,
        1540863900.0
    ],
    [
        1540864800.0,
        1540884600.0
    ],
    [
        1540901700.0,
        1540930500.0
    ],
    [
        1540909800.0,
        1540940400.0
    ],
    [
        1540932300.0,
        1540934100.0
    ],
    [
        1540904400.0,
        1540971000.0
    ],
    [
        1540926900.0,
        1541002500.0
    ],
    [
        1540989900.0,
        1540998900.0
    ],
    [
        1540995300.0,
        1541002500.0
    ],
    [
        1540979100.0,
        1541020500.0
    ],
    [
        1540989000.0,
        1541012400.0
    ],
    [
        1541003400.0,
        1541003400.0
    ],
    [
        1541020500.0,
        1541024100.0
    ],
    [
        1541094300.0,
        1541097900.0
    ],
    [
        1541087100.0,
        1541132100.0
    ],
    [
        1541106900.0,
        1541117700.0
    ],
    [
        1541110500.0,
        1541121300.0
    ],
    [
        1541142000.0,
        1541145600.0
    ],
    [
        1541130300.0,
        1541159100.0
    ],
    [
        1541181600.0,
        1541187000.0
    ],
    [
        1541180700.0,
        1541187900.0
    ],
    [
        1541181600.0,
        1541194200.0
    ],
    [
        1541185200.0,
        1541201400.0
    ],
    [
        1541195100.0,
        1541207700.0
    ],
    [
        1541203200.0,
        1541219400.0
    ],
    [
        1541208600.0,
        1541219400.0
    ],
    [
        1541266200.0,
        1541275200.0
    ],
    [
        1541260800.0,
        1541291400.0
    ],
    [
        1541276100.0,
        1541279700.0
    ],
    [
        1541263500.0,
        1541301300.0
    ],
    [
        1541283300.0,
        1541288700.0
    ],
    [
        1541293200.0,
        1541295000.0
    ],
    [
        1541298600.0,
        1541307600.0
    ],
    [
        1541438100.0,
        1541450700.0
    ],
    [
        1541438100.0,
        1541454300.0
    ],
    [
        1541459700.0,
        1541468700.0
    ],
    [
        1541412900.0,
        1541515500.0
    ],
    [
        1541464200.0,
        1541475000.0
    ],
    [
        1541466000.0,
        1541491200.0
    ],
    [
        1541483100.0,
        1541488500.0
    ],
    [
        1541499300.0,
        1541551500.0
    ],
    [
        1541525400.0,
        1541543400.0
    ],
    [
        1541536200.0,
        1541543400.0
    ],
    [
        1541556900.0,
        1541567700.0
    ],
    [
        1541534400.0,
        1541599200.0
    ],
    [
        1541610000.0,
        1541613600.0
    ],
    [
        1541626200.0,
        1541628000.0
    ],
    [
        1541629800.0,
        1541644200.0
    ],
    [
        1541636100.0,
        1541664900.0
    ],
    [
        1541668500.0,
        1541681100.0
    ],
    [
        1541695500.0,
        1541699100.0
    ],
    [
        1541700000.0,
        1541709000.0
    ],
    [
        1541710800.0,
        1541739600.0
    ],
    [
        1541725200.0,
        1541736000.0
    ],
    [
        1541789100.0,
        1541816100.0
    ],
    [
        1541801700.0,
        1541823300.0
    ],
    [
        1541797200.0,
        1541872800.0
    ],
    [
        1541904300.0,
        1541925900.0
    ],
    [
        1541966400.0,
        1541973600.0
    ],
    [
        1541981700.0,
        1541990700.0
    ]
]
var d_data = [];
var idx = 0;
var minute = 60;
var hour = minute * 60;
var day = hour * 24;
var week = day * 7;
var month = day * 30;
for (var a of data) {
    d_data.push({
        start: a[0],
        end: a[1],
        key: idx++,
        label: ""
    })
    if (idx > 15) {
        break;
    }
}

function now() {
    //return (+(new Date())) / 1000;
    return 1539486292 - day / 2;
}

class Component extends React.Component {
    constructor(props) {
        super(props);
        var orig_render = this.render.bind(this);
        this.render = () => orig_render(this.props, this.state);
    }
}
const sortby = (array, f) => {
    array.sort((a, b) => {
        var as = f(a);
        var bs = f(b);
        if (as > bs) {
            return 1;
        } else if (as < bs) {
            return -1;
        } else {
            return 0;
        }
    });
};
var mousecoords = { x: -1, y: -1 };
document.addEventListener('mousemove', (e) => {
    mousecoords = {
        x: e.clientX,
        y: e.clientY
    };
}, false);
var mouseDown = [0, 0, 0, 0, 0, 0, 0, 0, 0],
    mouseDownCount = 0;
document.addEventListener('mousedown', (evt) => {
    ++mouseDown[evt.button];
    ++mouseDownCount;
});
document.addEventListener('mouseup', (evt) => {
    --mouseDown[evt.button];
    --mouseDownCount;
});

export class DetectHover extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        this.debounced_update = debounce(this.update.bind(this), 100);
        this.container_ref = React.createRef();
    }
    set_hovered(hovered) {
        if (this.state.hovered === hovered) {
            return;
        }
        if (this.props.callback) {
            this.props.callback(hovered);
        }
        this.setState({ hovered: hovered });
    }
    update() {
        if (!this.state.hovered) {
            return;
        }
        if (this.container_ref.current) {
            var bounds = this.container_ref.current.getBoundingClientRect();
            if (mousecoords.x >= bounds.left
                && mousecoords.x <= bounds.right
                && mousecoords.y >= bounds.top
                && mousecoords.y <= bounds.bottom) {
                // contained, keep polling
            } else {
                this.set_hovered(false);
                return;
            }

        }
        this.debounced_update();
    }
    componentDidUpdate() {
        if (this.state.hovered) {
            this.debounced_update();
        }
    }
    render() {
        var Elem = this.props.elem;
        if (!Elem) {
            Elem = "div";
        }
        return (
            <Elem
                onMouseEnter={e => this.set_hovered(true)}
                onMouseLeave={e => this.set_hovered(false)}
                ref={this.container_ref}
                className={this.props.className}>
                {children}
            </Elem>
        );
    }
};
/*
    function union_into(target, source) {
        for (var elem of source) {
            target.add(elem);
        }
    }
    var heightinfo = {};
            var windows = {};
            const collide = e => {
                var res = heightinfo[e.key];
                if (!res) {
                    var collides = visible.filter(x => x.end > e.start && x.start < e.end);
                    heightinfo[e.key] = res = {collides};
                    for (var collision of res.collides) {
                        var hinfo = heightinfo[collision.key];
                        var ss, se;
                        if (hinfo) {
                            ss = hinfo.window.start;
                            se = hinfo.window.end;
                        }
                        res.window.start = Math.min(collision)
                    }
                    var window = windows[e.key];
                    if (!window) {
                        windows[e.key] = window = {
                            start: e.start,
                            end: e.end,
                            entries: new Set(),
                        };
                    }
                    for (var entry of collides) {
                        var existing_window = windows[entry.key];
                        if (existing_window) {
                            window.start = Math.min(window.start, existing_window.start);
                            window.end   = Math.max(window.end,   existing_window.end);
                            for (var existing_key of existing_window) {
                                window.entries.add(existing_key);
                            }
                        }
                        window.entries.add(entry.key)
                    }
                }
                return res;
            }
            for (var i=0; i<visible.length; i++) {
                var e = visible[i];
                var key = e.key;// || i;
            }
*/
function assert(condition, message) {
    if (!condition) {
        throw new Error(message || 'Assertion failed');
    }
}

class Timeline extends Component {
    constructor(props) {
        super(props);
        this.elem = React.createRef();
        this.state = {
            offset: 0,
            scale: 1,
            hovered: false,
            clicked: false,
        }
    }
    componentDidMount() {
        // D3 Code to create the chart
        //d3.select(this.elem.current)
        //    .style("background-color", "red");
    }

    componentDidUpdate() {
        // D3 Code to update the chart
        
    }

    componentWillUnmount() {
        // d3 code to destroy the chart
    }
    render({data=[], start, end, children=(()=>{}), ...props}) {
        //return <div className="timeline" ref={this.elem}/>
        var visible = data.filter(x => x.end > start && x.start < end);
        var rendered = [];
        var scale = end - start;
        var changes = [];
        var by_key = {};
        for (var e of visible) {
            by_key[e.key] = e;
            changes.push({ e, present: true, time: e.start });
            changes.push({ e, present: false, time: e.end });
        }
        sortby(changes, x => [x.time, x.present ? 0 : 1]);
        var windows = [];
        var state = new Set();
        var widx = 0;
        var lt = 0;
        for (var change of changes) {
            assert(change.time >= lt);
            lt = change.time;
            if (change.present) {
                if (!state.size) {
                    windows.push({
                        start: change.e.start,
                        end: change.e.end,
                        key: widx++,
                        items: new Set(),
                    })
                }
                windows[windows.length-1].items.add(change.e.key);
                state.add(change.e.key);
            } else {
                assert(state.has(change.e.key));
                windows[windows.length-1].end = change.time;
                state.delete(change.e.key);
            }
        }
        console.log(windows);

        assert(!state.size);
        //visible = windows;
        /*return <div>{changes.reduce((x=3, update) => {
            return x;
        }, undefined)}</div>;*/
        for (var i=0; i < visible.length; i++) {
            var e = visible[i];
            var key = e.key;
            var s_s = 100 * (e.start - start)/scale;
            var s_e = 100 * ((e.end - start) / scale);
            var s_w = s_e - s_s;
            rendered.push(<div style={{
                height: '100%',
                //top: i + 'px',
                bottom: '0px',
                left: '' + s_s.toFixed(0) + '%',
                //right: '' + s_e.toFixed(0) + '%',
                width: '' + s_w.toFixed(0) + "%",
                position: 'absolute',
                backgroundColor: '#00000099',
                overflow: 'hidden',
                display: 'inline-block',
                boxSizing: "border-box",
                //borderLeft: '1px solid blue',
                //borderRight: '1px solid red',
            }} key={key}>
                {children(e)}
            </div>);
        }
        return <div className="timeline" style={{
            position: 'relative',
            backgroundColor: '#fff6f0',
            overflow:'hidden',

            width: '700px',
            height: '100px'
        }} {...props}>
            {rendered}
        </div>
    }
};

function App() {
    return (
        <div className="App">
            <Timeline start={now()} end={now() + day} data={d_data}>
                {element => (<div>
                    {element.label}
                </div>)}
            </Timeline>
        </div>
    );
}

//const rootElement = document.getElementById("root");
//ReactDOM.render(<App />, rootElement);

export default App;
