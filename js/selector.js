function Selector(selector, parameters, callback){

    this.node = document.getElementById(selector);
    this.p = parameters;
    this.list = this.p.list;
    this.placeholder = this.p.placeholder || this.list[0].text;
    /*回调函数*/
    Object.defineProperty(this,'value',{
        configurable: true,
        enumerable: true,
        set: function(v){
            this.v = v;
            !!callback && typeof callback === 'function' && callback(v)
        },
        get: function(){
            return this.v
        }
    });
    this.v = !this.p.placeholder ? this.placeholder : '';

    /*取值 Get data*/
    var node = this.node,
        p = this.p,
        list = p.list,
        placeholder = p.placeholder || p.list[0].text;

    /*构建节点 structure*/
    var holder = document.createElement('span'),
        arrow = document.createElement('i'),
        current = document.createElement('div');

    holder.innerText = this.placeholder;
    arrow.className = 'collapse';
    current.className = 'current';

    current.appendChild(holder);
    current.appendChild(arrow);

    var ul = document.createElement('ul'),li,item;
    ul.className = 'collapse';
    for (var i = 0; i < this.list.length; i++){
        item = this.list[i];
        li = document.createElement('li');
        li.setAttribute('value', item.value || item.text);
        li.innerText = item.text;
        ul.appendChild(li)
    }

    node.innerHTML = '';
    node.appendChild(current);
    node.appendChild(ul);
    node.setAttribute('value', this.value);
    node.className += ' selector';

    /*绑定事件 bind handlers*/
    var self = this;
    current.addEventListener('click', function(event){
        var match_collapse = arrow.className.match(/collapse/),
            match_expand = arrow.className.match(/expand/);
        if (match_collapse){
            arrow.className = arrow.className.replace(/collapse/, 'expand');
            ul.className = ul.className.replace(/collapse/, 'expand');

            arrow.className = arrow.className.replace(/collapse/g, '');
            ul.className = ul.className.replace(/collapse/g, '')
        } else if (match_expand){
            arrow.className = arrow.className.replace(/expand/, 'collapse');
            ul.className = ul.className.replace(/expand/, 'collapse');

            arrow.className = arrow.className.replace(/expand/g, '');
            ul.className = ul.className.replace(/expand/g, '')
        } else {
            arrow.className = arrow.className += ' expand';
            ul.className = ul.className += ' expand';
        }
    });
    ul.addEventListener('click',function(event){
        var target = event.target,
            target_value = target.getAttribute('value'),
            target_text = target.innerText;
        self.value = target_value;
        holder.innerText = target_text;
        self.node.setAttribute('value',target_value);
        if (arrow.className.match(/expand/)){
            arrow.className = arrow.className.replace(/expand/, 'collapse');
            ul.className = ul.className.replace(/expand/, 'collapse');

            arrow.className = arrow.className.replace(/expand/g, '');
            ul.className = ul.className.replace(/expand/g, '')
        } else {
            arrow.className = arrow.className += ' collapse';
            ul.className = ul.className += ' collapse';
        }
    })
}