//ES6里面面向对象编程用类来构造对象的一些信息
class Background extends Base{
    //背景的属性
    // x=0; //背景图的x坐标
    // y=0; //背景图的y坐标
    // width=0;//画布宽
    // height=0;//画布的高
    // img="";//背景图片
    // context=null;//画布上下文
    //构造函数 当执行new Background()会自动执行的函数
    //构造函数初始化 并赋值属性.
    constructor(x,y,img,context,width,height){
        super(x,y,img,context,width,height);
    }
    //给背景定义draw方法 用来把当前背景图片绘制到画布
    draw(){
        this.y+=1;//背景从上往下运动 y坐标每次+1
        //drawImage(图片资源,x,y坐标,width,height绘制的高宽)
        this.context.drawImage(this.img,this.x,this.y,this.width,this.height);
        //判断当y坐标大于游戏高度的时候，这是证明这张图已经跑到最后了 
        //立即把坐标设置为-高度 继续滚动.
        if(this.y>=this.height){
            this.y=-this.height+1;
        }
    }
}