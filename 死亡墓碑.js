function died(event)
{
	var pPlayer = event.player;
	var pWorld = pPlayer.world;
	
	var dieLoc = pPlayer.getPos();
	var block = pWorld.getBlock(dieLoc.x, dieLoc.y, dieLoc.z);
	//淹死/闷死的
	if(!block.isAir())
		return;
	//获取地面
	while(block.isAir())
	{
		if(dieLoc.y == 0)
			return;
		dieLoc = dieLoc.down();
		block = pWorld.getBlock(dieLoc.x, dieLoc.y, dieLoc.z);
	}
	dieLoc = dieLoc.up();
	//设置墓碑
	pWorld.setBlock​(dieLoc.x,dieLoc.y,dieLoc.z, "variedcommodities:tombstone", 0);
	block = pWorld.getBlock(dieLoc.x, dieLoc.y, dieLoc.z);
	var pNbt = block.getTileEntityNBT();
	//写点墓志铭
	pNbt.setString("SignText", (event.source ? "因&d" + event.source.name + "\n &a" : "&a") + pPlayer.name + "&f长眠于此.");
	pNbt.setInteger​("SignRotation", parseInt(pPlayer.getRotation()/90) + 1);
	block.setTileEntityNBT(pNbt);
}