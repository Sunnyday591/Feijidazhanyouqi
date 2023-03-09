class Bomb extends Base{
    playindex=0;//炸弹的播放下标
    islife=true;
    //炸弹的图片 应该是是一个数组
    constructor(x,y,img,context){
        super(x,y,img,context);
    }
    draw(){
        //判断如果炸弹消除了 那么就不绘制图片
        if(this.islife){
            let img=this.img[this.playindex];
            //敌机的中心点坐标还要减去炸弹图片的一半
            this.context.drawImage(img,this.x-(img.width/2),this.y-(img.height/2));
        }
        //绘制的炸弹图片的下标+1
        this.playindex++;
        //this.img.length 获取数组的长度
        //当炸弹的图片下标超出了总图片数量 那么设置炸弹的生命为false
        if(this.playindex>=this.img.length){
            this.islife=false;
        }
    }
}