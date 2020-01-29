function damagedEntity(event)
{
	var pPlayer = event.player;
	if(pPlayer.nbt.getBoolean("hitMark"))
	{
		pPlayer.playSound("mw:hurt", 1, 1);
	}
	
	if(pPlayer.nbt.getBoolean("hitReport"))
	{
		var distance = event.target.getPos().distanceTo(pPlayer.getPos());
		pPlayer.message("击中&a" + event.target.name + "&f伤害&c" + event.damage.toFixed(2) + "&f距离&b" + distance.toFixed(2));
	}
	
}

function keyPressed(event)
{
	var pPlayer = event.player;
	//ctrl + h
	if(event.key == 35 && event.isCtrlPressed)
	{
		if(event.isShiftPressed)
		{
			pPlayer.sendNotification("击中反馈", "伤害汇报已" + (pPlayer.nbt.getBoolean("hitReport") ? "关闭" : "开启"), 1);
			pPlayer.nbt.setBoolean("hitReport", !pPlayer.nbt.getBoolean("hitReport"));
			return;
		}
		pPlayer.sendNotification("击中反馈", "击中反馈音效已" + (pPlayer.nbt.getBoolean("hitMark") ? "关闭" : "开启"), 1);
		pPlayer.nbt.setBoolean("hitMark", !pPlayer.nbt.getBoolean("hitMark"));
	}
}