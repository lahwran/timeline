//import logo from './logo.svg';

import './App.css';
import React from "react";
//import ReactDOM from "react-dom";
import * as rxjs from 'rxjs';
import { operators as rxop } from 'rxjs';
import data from './data';
//import * as d3 from "d3";

//import "./styles.css";

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
//const subject = new BehaviorSubject(0); // 0 is the initial value
// 
//subject.subscribe({
//  next: (v) => console.log(`observerA: ${v}`)
//});
// 
//subject.next(1);
//subject.next(2);
// 
//subject.subscribe({
//  next: (v) => console.log(`observerB: ${v}`)
//});
// 
//subject.next(3);
 
var mousecoords = new rxjs.BehaviorSubject({ clientX: -1, clientY: -1 });
rxjs.fromEvent(document, 'mousemove', true).subscribe(mousecoords);
//document.addEventListener('mousemove', (e) => {
//    mousecoords = {
//        x: e.clientX,
//        y: e.clientY
//    };
//}, false);
var mousedown_all = new rxjs.BehaviorSubject(false);
var mousedown = {};
for (var x = 0; x < 20; x++) {
    mousedown[x] = new rxjs.BehaviorSubject(false);
}
var mousedown_vals = {};
var mousedown_val_all = 0;
document.addEventListener('mousedown', (evt) => {
    if (!mousedown_val_all) { mousedown_all.next(true); }
    if (!mousedown_vals[evt.button]) { mousedown[evt.button].next(true); }
    mousedown_vals[evt.button] = (mousedown_vals[evt.button] || 0) + 1;
    ++mousedown_val_all;
}, true);
document.addEventListener('mouseup', (evt) => {
    var next_btn = (mousedown_vals[evt.button] || 0) - 1;
    var next_all = mousedown_val_all - 1;
    if (!next_all) { mousedown_all.next(false); }
    if (!next_btn) { mousedown[evt.button].next(false); }
    mousedown_vals[evt.button] = next_btn;
    mousedown_val_all = next_all;
}, true);

//export class DetectHover extends Component {
//    constructor(props) {
//        super(props);
//        this.state = {
//        };
//        this.debounced_update = debounce(this.update.bind(this), 100);
//        this.container_ref = React.createRef();
//    }
//    set_hovered(hovered) {
//        if (this.state.hovered === hovered) {
//            return;
//        }
//        if (this.props.callback) {
//            this.props.callback(hovered);
//        }
//        this.setState({ hovered: hovered });
//    }
//    update() {
//        if (!this.state.hovered) {
//            return;
//        }
//        if (this.container_ref.current) {
//            var bounds = this.container_ref.current.getBoundingClientRect();
//            if (mousecoords.x >= bounds.left
//                && mousecoords.x <= bounds.right
//                && mousecoords.y >= bounds.top
//                && mousecoords.y <= bounds.bottom) {
//                // contained, keep polling
//            } else {
//                this.set_hovered(false);
//                return;
//            }
//
//        }
//        this.debounced_update();
//    }
//    componentDidUpdate() {
//        if (this.state.hovered) {
//            this.debounced_update();
//        }
//    }
//    render() {
//        var Elem = this.props.elem;
//        if (!Elem) {
//            Elem = "div";
//        }
//        return (
//            <Elem
//                onMouseEnter={e => this.set_hovered(true)}
//                onMouseLeave={e => this.set_hovered(false)}
//                ref={this.container_ref}
//                className={this.props.className}>
//                {children}
//            </Elem>
//        );
//    }
//};
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
        this.debounced_update = debounce(this.update.bind(this), 100);
        this.container_ref = React.createRef();
    }
    set_hovered(hovered) {
        if (this.state.hovered === hovered) {
            return;
        }
        this.setState({ hovered });
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
        this.dying = true;
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
