function redstone(event)
{
	//回收倍率
	var restoreFactor = 6;
	//弹匣放入方块
	var magCotainer = event.block.world.getBlock(-8,66,-646).getContainer().getItems();
	//弹匣总数
	var magCounter = 0;
	//非空格序号
	var nEmptyList = [];
	//获取弹匣总数和非空格序号
	for(var i = 0; i < magCotainer.length;i++)
	{
		if(magCotainer[i].getName().indexOf("mw:") == 0 && magCotainer[i].getName().indexOf("mag") != -1)
		{
			if(!magCotainer[i].isEmpty())
			{
				magCounter += magCotainer[i].getStackSize();
				nEmptyList.push(i);
			}
		}		
	}
	//兄啊，你这要么是空箱子要么不够回收的啊
	if(nEmptyList.length == 0 || magCounter < restoreFactor)
		return;
	//获得应该删掉的弹匣数
	magCounter = magCounter - magCounter%restoreFactor;
	//应该返还的硬币数
	var iCoinNums = magCounter/restoreFactor;
	//删掉弹匣
	for(var i = 0; i < nEmptyList.length;i++)
	{
		if(magCounter - magCotainer[nEmptyList[i]].getStackSize() < 0)
		{
			magCotainer[nEmptyList[i]].setStackSize​(magCotainer[nEmptyList[i]].getStackSize() - magCounter);
			break;
		}
		magCounter -= magCotainer[nEmptyList[i]].getStackSize();
		magCotainer[nEmptyList[i]].setStackSize​(0);
	}
	//从指定箱子获得货币模版
	var expCoin = event.block.world.getBlock(-18,65,-630).getContainer().getSlot(1).copy();
	expCoin.setStackSize​(iCoinNums);
	//返还箱子序号
	var index = 0;
	//获取返还箱
	var coinContainer = event.block.world.getBlock(-7,65,-646).getContainer();
	//填充硬币
	while(!coinContainer.getSlot(index).isEmpty())
	{
		if(index >= coinContainer.getSize())
			break;
		index++;
	}
	magCotainer = coinContainer.setSlot(index, expCoin);
}