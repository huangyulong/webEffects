// 基于React实现一个可复用的展示鼠标位置的高阶组件（HOC），要求接收一个组件，返回一个新的组件

import React from 'react';
const withMouse = (Component) => {
    return class extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                screenX: 0,
                screenY: 0,
            }
            this.changeMouse = this.changeMouse.bind(this)
        }

        changeMouse(e) {
            let x = e.screenX
            let y = e.screenY
            this.setState({
                screenX: x,
                screenY: y,
            })
        }

        render(){
            return (
                <div onMouseMove={this.changeMouse}>
                    <p>鼠标横坐标：{this.state.screenX}</p>   
                    <p>鼠标纵坐标：{this.state.screenY}</p> 
                    <Component /> 
                </div>
            )
        }
    }
}

export default withMouse



// 一、请编写一个正则表达式，用于验证合法的 URL，比如 https://www.aliyun.com/；
// 二、编写一个正则表达示将 URL 中的二级域名提取出来，比如，https://www.aliyun.com/ 提取出 aliyun
1、/^((http|https):\/\/)?([\w-_]+\.)?[0-9a-zA-Z_]+\.[a-z\.]{2,6}(\/?\w+)?[\?]?[\w=&%/]*/

2、
let url = 'https://www.aliyun.com/'
getSecondDoMain(url)
function getSecondDoMain(url) {
		let doMain = ''
  	let secondDoMain = ''
  	if(/\/\//.test(url)) {
    	doMain = url.match(/\/\/[\w\.-]+(\/|\?|\S)/)[0]
  	}else {
    	doMain = url.match(/[\w\.-]+(\/|\?|\S)/)[0]
  	}
  	let doMainArr = doMain.split('.')
  	let firstDoMain = doMainArr[doMainArr.length-1]
  	if(/(\/|\?)/.test(firstDoMain)) {
    	firstDoMain.substr(0, firstDoMain.length-1)
  	}
  	if(firstDoMain.length > 2 && firstDoMain.length < 6) {
    	secondDoMain = doMainArr[doMainArr.length-2]
  	}else {
    	secondDoMain = doMainArr[doMainArr.length-3]
  	}
  	return secondDoMain
}



// 实现withSearchQuery高阶组件，将客户端路由中的search字符串解析为一个query对象作为props传给下层组件，
// 并封装addSearchQuery（接受一个参数对象，追加到路由的search字符串中并跳转）、
// replaceSearchQuery(接受一个参数对象，整体替换路由的search字符串并跳转）、
// removeSearchQuery（移除路由中的指定参数并跳转，此函数可接受多个参数，每个参数的都是路由中search字符串需要删除的参数的key）
// 三个操作search字符串的方法，作为props传给下层组件。

import queryString from 'query-string';
import { withRouter } from 'react-router';
import React from 'react'
// 请先compose  withRouter高阶组件，使用withRouter提供的history和location属性
//  如果熟悉recompose，可以引入recompose，或者其他熟悉的第三方库
class Parent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            searchData: location.search ? queryString.parse(location.search) : {},
            reg: /\?[\w=&]*/ig
        }
        this.addSearchQuery = this.addSearchQuery.bind(this)
        this.replaceSearchQuery = this.replaceSearchQuery.bind(this)
        this.removeSearchQuery = this.removeSearchQuery.bind(this)
    }

    addSearchQuery(param) {
        let newSearchData = Object.assign(param, this.state.searchData)
        let newSearch = queryString.stringify(newSearchData)
        let href = location.href.replace(this.state.reg, '?'+newSearch)
        location.href = href
    }

    replaceSearchQuery(param) {
        let newSearch = queryString.stringify(param)
        let href = location.href.replace(this.state.reg, '?'+newSearch)
        location.href = href
    }

    removeSearchQuery(param) {
        if(param.length > 0) {
            let search = Object.assign({}, this.state.searchData)
            param.forEach((item) => {
                if(search[item]) {
                    delete search[item]
                }
            })
            let newSearch = queryString.stringify(search)
            let href = location.href.replace(this.state.reg, '?'+newSearch)
            location.href = href
        }
    }

    render() {
        return (
            <div>
                <Son 
                    searchData={this.state.searchData}
                    addSearchQuery={this.addSearchQuery}
                    replaceSearchQuery={this.replaceSearchQuery}
                    removeSearchQuery={this.removeSearchQuery}
                />
            </div>
        )
    }
}

class Son extends React.Component {
  	constructor(props) {
    		super(props)
    		this.changeSearch = this.changeSearch.bind(this)
  	}
  
    changeSearch() {
        this.props.addSearchQuery({key1: "key1"})
        this.props.replaceSearchQuery({key2: "key2"})
        this.props.removeSearchQuery(['key1', 'key2'])
    }
  
	render() {
        return (
            <div>
                <button onClick={this.changeSearch}>操作search</button>
            </div>
        )
    }
}

const ParentPage = withRouter(Parent)

export default ParentPage



//  将类似以下JSON表示的树状结构（可以无限层级）通过parseDOM函数
//（使用document.createElement，document.createTextNode，appendChild等方法）生成一颗DOM树（返回一个element元素）

import React from 'react'
export default class ChildrenPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
             JsonTree : {
                "tagName": "ul",
                "props": {
                  "className": "list",
                  "data-name": "jsontree"
                },
                "children": [{
                    "tagName": "li",
                    "children": [{
                      "tagName": "img",
                      "props": {
                        "src": "//img.alicdn.com/tps/TB1HwXxLpXXXXchapXXXXXXXXXX-32-32.ico",
                        "width": "16px"
                      }
                    }]
                  },
                  {
                    "tagName": "li",
                    "children": [{
                      "tagName": "a",
                      "props": {
                        "href": "https://www.aliyun.com",
                        "target": "_blank"
                      },
                      "children": "阿里云"
                    }]
                  }
                ]
              }
        }
        this.parseDOM = this.parseDOM.bind(this)
    }

    changeSearch() {
        this.props.addSearchQuery({children1: "huang"})
        this.props.replaceSearchQuery({children2: "huang"})
        this.props.removeSearchQuery(['name', 'children2'])
    }


    childrens(item, element) {
        
    }

     parseDOM(){
        const {tagName,props,children} = this.state.JsonTree;
        const element = document.createElement(tagName);
        //请实现过程
        //....
        Object.keys(props).forEach((item) => {
            element.setAttribute(item, props[item])
        })
        console.log(children)
        if(children instanceof Array && children.length > 0) {
            // debugger
            children.forEach((item) => {
                // if(index === 0) {
                    let childElement = document.createElement(item.tagName)
                    let textNode = document.createTextNode(item.tagName)
                    childElement.appendChild(textNode)
                    element.appendChild(childElement)
                    if(item.props) {
                        Object.keys(item.props).forEach((item) => {
                            childElement.setAttribute(item, props[item])
                        })
                    }
                    if(item.children) {
                        arguments.callee(item.children)
                    }
                // }
               
            })
        }
       
        console.log(element)
        return element;
      }
    

    render() {
        return (
            <div>
                childrenPage
                <button onClick={this.parseDOM}>操作search</button>
            </div>
        )
    }
}

