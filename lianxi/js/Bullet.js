class Bullet extends Base{
    hurt=10;//子弹伤害值
    islife=true;//记录子弹是否还有生命 如果有就是true 没有就是false
    speed=10;//记录子弹速度
    constructor(x,y,context,img,speed,hurt=10){//hurt=10给定一个默认值 不传参的是默认是10
        super(x,y,img,context);
        this.speed=speed;
        this.hurt=hurt;
    }
    draw(){
        this.y-=this.speed;
        this.context.drawImage(this.img,this.x,this.y);
        if(this.y<-38){//判断子弹的坐标如果完全消失在可视区，那么设置子弹的生命为false
            this.islife=false;
        }
    }
}