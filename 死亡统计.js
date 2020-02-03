function setStatic(world, x, y, z, str1, str2, color)
{
	var block = world.getBlock(x, y, z);
	if(block.isAir())
	{
		block = block.setBlock("variedcommodities:tombstone");
	}
	var pNbt = block.getTileEntityNBT();
	var iCounter = pNbt.getString("SignText").split("\n");
	if(iCounter.length <= 1)
	{
		iCounter = 1;
	}
	else
	{
		iCounter = parseInt(iCounter[1].replace(color,""));
		iCounter++;
	}
	pNbt.setString("SignText", str1 + "\n" + color + iCounter + "\n" + str2);
	pNbt.setInteger("SignRotation", 3);
	block.setTileEntityNBT(pNbt);
}

function died(event)
{
	setStatic(event.player.world, 211, 70, -776, "世界迎来了他第", "&f次的死亡.", "&c");
}

//击杀统计
function kill(event)
{
	setStatic(event.player.world, 211, 70, -775, "因为你, 第", "&f个生命消失在了世间", "&b");
}