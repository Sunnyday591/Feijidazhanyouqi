//基础类 所有其他拥有基本属性 x y img contenxt等属性的对象都可以继承自Base
class Base{
    x=0;
    y=0;
    img='';
    context="";
    width=0;
    height=0;
    constructor(x,y,img,context,width=0,height=0){
        this.x=x;
        this.y=y;
        this.img=img;
        this.context=context;
        this.width=width;
        this.height=height;
    }
}