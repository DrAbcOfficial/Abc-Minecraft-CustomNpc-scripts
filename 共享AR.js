//租枪机
function itemIndex(Items, pItem)
{
	var tempArr = [];
	for(var i = 0; i < Items.length; i++)
	{
		if(Items[i].compare(pItem, true))
			tempArr.push(i);
	}
	return tempArr;
}

function interact(event)
{
	var pPlayer = event.player;
	var isRented = pPlayer.nbt.getBoolean("sARed");
	if(isRented)
	{
		pPlayer.sendNotification("你已经租过步枪了", "需要还枪去隔壁机器", 0);
		return;
	}
	var expContainer = pPlayer.world.getBlock(-18,65,-630).getContainer();
	var Items = pPlayer.getInventory().getItems();
	var index = itemIndex(Items, expContainer.getSlot(1));
	if(index.length == 0)
	{
		pPlayer.sendNotification("你好像没有钱的样子", "去找点" + expContainer.getSlot(1).getItemName() + "吧", 0);
		return;
	}
	var hasCoin = 0;
	var reqCoin = expContainer.getSlot(1).getStackSize();
	for(var i = 0; i < index.length; i++)
	{
		hasCoin += Items[index[i]].getStackSize();
	}
	if(hasCoin < reqCoin)
	{
		pPlayer.sendNotification("你好像钱不够的样子", "至少要" + expContainer.getSlot(1).getItemName() + " " + reqCoin +"块哦", 0);
		return;
	}
	
	for(var i = 0; i < index.length; i++)
	{
		var tempSize = Items[index[i]].getStackSize();
		if( tempSize >= reqCoin)
		{
			event.player.inventory.items[index[i]].setStackSize(tempSize - reqCoin);
			break;
		}
		if( tempSize < reqCoin)
		{
			event.player.inventory.items[index[i]].setStackSize(0);
			reqCoin -= tempSize;
		}
	}
	
	pPlayer.nbt.setBoolean("sARed", true);
	pPlayer.nbt.setLong("sARtime", pPlayer.world.getTotalTime());
	pPlayer.sendNotification("共享步枪", "你租到了一把共享步枪", 0);
	//会有bug
	pPlayer.giveItem​(expContainer.getSlot(0));
	//pPlayer.world.getBlock(-4, 67, -636).getContainer().setSlot(0, expContainer.getSlot(0));
	
}

//还枪机
function itemIndex(Items, pItem)
{
	var tempArr = [];
	for(var i = 0; i < Items.length; i++)
	{
		if(Items[i].compare(pItem, true))
			tempArr.push(i);
	}
	return tempArr;
}

function hasGun(Items, pItem)
{
	for(var i = 0; i < Items.length; i++)
	{
		if(Items[i].compare(pItem, true))
			return true;
	}
	return false;
}

function interact(event)
{
	var pPlayer = event.player;
	var isRented = pPlayer.nbt.getBoolean("sARed");
	if(!isRented)
	{
		pPlayer.sendNotification("你还没租枪", "不需要还枪鸭", 0);
		return;
	}
	var expContainer = pPlayer.world.getBlock(-18,65,-630).getContainer();
	var Items = pPlayer.getInventory().getItems();
	if(!hasGun(Items, expContainer.getSlot(0)))
	{
		pPlayer.sendNotification("你租出去的步枪呢", "请带着枪来", 0);
		return;
	}
	var index = itemIndex(Items, expContainer.getSlot(1));
	var hasCoin = 0;
	var reqCoin = parseInt((pPlayer.nbt.getLong("sARtime") - pPlayer.world.getTotalTime())/10000);
	for(var i = 0; i < index.length; i++)
	{
		hasCoin += Items[index[i]].getStackSize();
	}
	if(hasCoin < reqCoin)
	{
		pPlayer.sendNotification("你好像钱不够的样子", "至少要" + expContainer.getSlot(1).getItemName() + " " + reqCoin +"块哦", 0);
		pPlayer.message("租借规则，每10000tick 一单位钱，你已租了&c" + reqCoin * 10000 + "tick");
		return;
	}
	
	for(var i = 0; i < index.length; i++)
	{
		var tempSize = Items[index[i]].getStackSize();
		if( tempSize >= reqCoin)
		{
			event.player.inventory.items[index[i]].setStackSize(tempSize - reqCoin);
			break;
		}
		if( tempSize < reqCoin)
		{
			event.player.inventory.items[index[i]].setStackSize(0);
			reqCoin -= tempSize;
		}
	}
	
	pPlayer.nbt.remove("sARed");
	pPlayer.nbt.remove("sARtime");
	pPlayer.sendNotification("共享步枪", "你已成功还枪", 0);
	pPlayer.removeItem​​(expContainer.getSlot(0), 1);
}