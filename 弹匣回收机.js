function redstone(event)
{
	var magCotainer = event.block.world.getBlock(-8,66,-646).getContainer().getItems();
	var magCounter = 0;
	var nEmptyList = [];
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

	if(nEmptyList.length == 0)
		return;
	
	if(magCounter < 6)
		return;
	
	for(var i = 0; i < nEmptyList.length;i++)
	{
		if(magCounter < 6)
		{
			magCotainer[nEmptyList[i]].setStackSize​(magCotainer[nEmptyList[i]].getStackSize() - magCounter);
			break;
		}
		else
		{
			if(magCounter - magCotainer[nEmptyList[i]].getStackSize() < 0)
			{
				magCotainer[nEmptyList[i]].setStackSize​(magCotainer[nEmptyList[i]].getStackSize() - magCounter);
				break;
			}
			magCounter -= magCotainer[nEmptyList[i]].getStackSize()
			magCotainer[nEmptyList[i]].setStackSize​(0);
		}
	}
	
	magCotainer = parseInt(magCounter/6);
	var expCoin = event.block.world.getBlock(-18,65,-630).getContainer().getSlot(1).copy();
	expCoin.setStackSize​(magCotainer);
	var index = 0;
	var coinContainer = event.block.world.getBlock(-7,65,-646).getContainer();
	while(!coinContainer.getSlot(index).isEmpty())
	{
		if(index >= coinContainer.getSize())
			break;
		index++;
	}
	magCotainer = coinContainer.setSlot(index, expCoin);
}