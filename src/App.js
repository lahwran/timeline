//import logo from './logo.svg';

import './App.css';
import React from "react";
//import ReactDOM from "react-dom";
import * as rxjs from 'rxjs';
import {map} from 'rxjs/operators';
import data from './data';
//import * as most from 'most';
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
    //if (idx > 15) {
    //    break;
    //}
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

        var orig_componentWillUnmount = (
            this.componentWillUnmount 
                ? this.componentWillUnmount.bind(this)
                : (() => {})
        );

        this.teardown = [];
        this.componentWillUnmount = () => {
            orig_componentWillUnmount()
            for (var teardown of this.teardown) {
                teardown();
            }
        };
    }
    sub(thing, func) {
        var s = thing.subscribe(func);
        this.teardown.push(() => s.unsubscribe);
    }
}

//function* allTheIntegers(interval) {
//	var i = 0;
//	while(true) {
//		yield delayPromise(interval, i++)
//	}
//}
//
//const delayPromise = (ms, value) =>
//	new Promise(resolve => setTimeout(() => resolve(value), ms));
//
//async function derp() {
//	for await (var derp of allTheIntegers(1000)) {
//        if (derp > 100) {
//            return;
//        }
//        console.log(derp);
//	}
//}
//derp()

//most.generate(allTheIntegers, 1000)
//	.take(100)
//	.observe(x => console.log(x));
//
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
rxjs.fromEvent(document, 'mousemove', true).pipe(
    map(({clientX, clientY}) => ({clientX: clientX + 0, clientY: clientY + 0}))
).subscribe(mousecoords);
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
//            var bounds = ;
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
            scale: 4,
        }
        this.container_ref = React.createRef();
        this.click = new rxjs.BehaviorSubject();
        this.sub(
            rxjs.combineLatest(mousedown[0], mousecoords, this.click),
            ([down, movement, click]) => {
                if (!down || !click) {
                    if (click) { this.click.next(undefined); }
                    return;
                }
                var scale = (click.screen.right - click.screen.left) * this.state.scale;
                var scaled_orig = (click.event.clientX - click.screen.left) / scale;
                var q = movement.clientX;
                var p = click.screen.left
                var scaled_now = (q - p) /scale;
                var delta = scaled_now-scaled_orig;
                this.setState({offset: click.offset + delta});
                //console.log(down, movement, click, {scale, scaled_orig, scaled_now, delta, q, p});
            }
        );
    }
    //set_hovered(hovered) {
    //    if (this.state.hovered === hovered) {
    //        return;
    //    }
    //    this.setState({ hovered });
    //}
    //componentDidUpdate() {
    //    if (this.state.hovered) {
    //        this.debounced_update();
    //    }
    //}
    componentDidMount() {
        // D3 Code to create the chart
        //d3.select(this.elem.current)
        //    .style("background-color", "red");
    }
    doclick(event) {
        var rect = this.container_ref.current.getBoundingClientRect();
        this.click.next({
            offset: this.state.offset,
            scale: this.state.scale,
            screen: {left: rect.left, right: rect.right},
            event: {clientX: event.clientX, clientY: event.clientY}
        });
        event.preventDefault();
        return false;
    }
    dowheel(event) {
        if (this.click.value) {
            return;
        }
        var rect = this.container_ref.current.getBoundingClientRect();
        //this.wheel.next({
        //    offset: this.state.offset,
        //    scale: this.state.scale,
        //    screen: {left: rect.left, right: rect.right},
        //    event: {deltaX: event.deltaX, deltaY: event.deltaY}
        //});
        var scale = (rect.right - rect.left) * this.state.scale;
        var scenter = (rect.right + rect.left) / 2;
        var curscale = this.state.scale;
        var newscale = Math.max(Math.min(200, curscale * Math.exp(event.deltaY * 0.01)), 0.01);
        var sdelta = newscale / curscale;
        var orig_delta = (event.clientX - scenter) * curscale;
        var new_delta = sdelta * orig_delta;
        var meta_delta = orig_delta - new_delta;
        this.setState({
            offset: this.state.offset - (meta_delta + event.deltaX / scale),
            scale: newscale
        });
        event.preventDefault();
        return false;

    }
    componentWillUnmount() {
        // d3 code to destroy the chart
        this.dying = true;
    }
    render({data=[], start, end, children=(()=>{}), ...props}) {
        //return <div className="timeline" ref={this.elem}/>
        var scale = end - start;
        var center = start + (scale/2);
        center -= this.state.offset * scale;
        scale /= this.state.scale;
        end = center + scale / 2;;
        start = center - scale / 2;
        var slop = 0
        var visible = data.filter(x => x.end > start - scale*slop && x.start < end + scale*slop);
        var rendered = [];
        var scale = end - start;
        var changes = [];
        var by_key = {};
        for (var e of visible) {
            by_key[e.key] = e;
            changes.push({ e, present: true, time: e.start });
            changes.push({ e, present: false, time: Math.max(e.start+1, e.end-60) });
        }
        sortby(changes, x => [x.time, x.present ? 0 : 1]);
        var windows = [];
        var state = new Set();
        var states = {};
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
        var heightinfo = {};
        for (var win of windows) {
            var items = Array.from(win.items);
            sortby(items, x => by_key[x].start);
            var idx = 0;
            for (var entry of items) {
                heightinfo[entry] = {item: idx++, count: items.length};
            }
        }
        //console.log(windows);

        assert(!state.size);
        /*return <div>{changes.reduce((x=3, update) => {
            return x;
        }, undefined)}</div>;*/
        for (var i=0; i < visible.length; i++) {
            var e = visible[i];
            var key = e.key;
            var hinfo = heightinfo[key] || {item: 0, count: 1};
            var count = Math.max(4, hinfo.count);
            var top = hinfo.item * 100 / count;
            var height = 100 / count;
            var s_s = 100 * (e.start - start)/scale;
            var s_e = 100 * ((e.end - start) / scale);
            var s_w = s_e - s_s;
            rendered.push(<div className="timeline-element" style={{
                top: '' + top.toFixed(3) + '%',
                left: '' + s_s.toFixed(3) + '%',
                height: '' + height.toFixed(4) + '%',
                width: '' + s_w.toFixed(3) + "%",
            }} key={key}>
                {children(e)}
            </div>);
        }
        return (
            <div className="timeline"
                draggable={false}
                onMouseDown={e => this.doclick(e)}
                onWheel={e => this.dowheel(e)}>
                <div
                    className="timeline-inner"
                    ref={this.container_ref}
                    style={{

                    }} {...props}
                >
                    {rendered}
                </div>
            </div>
        );
    }
};

function App() {
    return (
        <div className="App">
            <Timeline start={now()} end={now() + week} data={d_data}>
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
