class Star extends Base{
    speed=1;
    blood=100;
    islife=true;//记录心心是否存活  true活得 false挂了
    sta=20;//加分
    constructor(x,y,width,height,img,context,speed=10,blood=100){
        super(x,y,img,context,width,height);
        this.speed=speed;
        this.blood=blood;
        
    }
    draw(){
        this.y+=this.speed;
        this.context.drawImage(this.img,this.x,this.y);
        if(this.y>this.height){
            this.islife=false;//当星星的Y坐标超出可视区 那么让星星消失
        }
    }
}