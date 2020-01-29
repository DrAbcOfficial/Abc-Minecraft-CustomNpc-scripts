/***
	远程传送
***/
//获取红石的使用者
function getRedstonePlayer(world, pos)
{
	var list = world.getAllPlayers();
	for(var i = 0; i < list.length; i++)
	{
		if(	pos.distanceTo(list[i].pos) < 3)
			return list[i]
	}
	return null;
}

function redstone(event)
{
	var tempPos = event.block.pos;
	var pPlayer = getRedstonePlayer(event.block.world, tempPos);
	if(!pPlayer)
		return;
	//传送玩家到队伍选择室
	pPlayer.setPosition(446, 84, -958);
}

/**
	带我离开这
**/
function interact(event)
{
	event.player.setPosition(109, 71, -615);
}

/**
	观察者
**/
function interact(event)
{
	event.player.setPosition(438, 84, -952);
}

/**
	回到准备室
**/
function interact(event)
{
	event.player.setPosition(438, 84, -958);
}

//清除玩家全部物品的lib
function clearInventory(pPlayer)
{
	var Items = pPlayer.getInventory().getItems();
	for(var i = 0; i < Items.length; i++)
	{
		pPlayer.removeItem​(Items[i], Items[i].getStackSize());
	}
}

/**
	参加游戏
**/

function interact(event)
{
	var pPlayer = event.player;
	//将玩家设置为冒险模式
	pPlayer.setGamemode(2);
	//补满饥饿
	pPlayer.setHunger(20);
	//发送一条Notification
	pPlayer.sendNotification("准备室", "请选择队伍", 0);
	//清除玩家背包
	clearInventory(pPlayer);
	//标记玩家nbt为tdm
	pPlayer.nbt.setBoolean("tdm", true);
	//传送玩家到队伍选择室
	pPlayer.setPosition(439, 84, -959);
}

//获取特定坐标容器
function getBlockContainer(world, x, y, z)
{
	return world.getBlock(x, y, z).getContainer();
}

/**
	加入队伍
**/
//出生点坐标
var arrSpawns = new Array(
	new Array(458, 64, -963),
	new Array(461, 64, -963),
	new Array(458, 64, -968),
	new Array(461, 64, -968),
	new Array(458, 64, -948),
	new Array(461, 64, -948),
	new Array(458, 64, -943),
	new Array(461, 64, -943)
);

function interact(event)
{
	var pPlayer = event.player;
	//发送一条Notification
	pPlayer.sendNotification("已选择队伍", "你被分配到了红队", 0);
	//标记玩家nbt队伍
	pPlayer.nbt.setString("tdm_team", "red");
	//为玩家带上帽子
	pPlayer.setArmor​(3, getBlockContainer(pPlayer.world, 438, 84, -963).getItems()[0]);
	//传送玩家到出生点
	var spawnPos = arrSpawns[Math.floor(Math.random()*arrSpawns.length)];
	pPlayer.setPosition(spawnPos[0], spawnPos[1], spawnPos[2]);
	//设置玩家出生点
	pPlayer.setSpawnpoint(spawnPos[0], spawnPos[1], spawnPos[2]);
}

/**
	加入队伍
**/
//出生点坐标
var arrSpawns = new Array(
	new Array(415, 64, -963),
	new Array(417, 64, -963),
	new Array(415, 64, -968),
	new Array(417, 64, -968),
	new Array(415, 64, -948),
	new Array(417, 64, -948),
	new Array(415, 64, -943),
	new Array(417, 64, -943)
);

function interact(event)
{
	var pPlayer = event.player;
	//发送一条Notification
	pPlayer.sendNotification("已选择队伍", "你被分配到了蓝队", 0);
	//标记玩家nbt队伍
	pPlayer.nbt.setString("tdm_team", "blue");
	//为玩家带上帽子
	pPlayer.setArmor​(3, getBlockContainer(pPlayer.world, 438, 84, -963).getItems()[1]);
	//传送玩家到出生点
	var spawnPos = arrSpawns[Math.floor(Math.random()*arrSpawns.length)];
	pPlayer.setPosition(spawnPos[0], spawnPos[1], spawnPos[2]);
	//设置玩家出生点
	pPlayer.setSpawnpoint(spawnPos[0], spawnPos[1], spawnPos[2]);
}

/**
	退出游戏
	**/
function interact(event)
{
	var pPlayer = event.player;
	//将玩家设置为生存模式
	pPlayer.setGamemode(0);
	//删除玩家nbt
	pPlayer.nbt.remove("tdm_team");
	pPlayer.nbt.remove("tdm");
	//发送一条Notification
	pPlayer.sendNotification("退出小游戏", "你已经离开了小游戏", 0);
	//传送玩家到spawn
	pPlayer.setPosition(109, 71, -615);
}

/**
	友军伤害
**/
function damaged(event)
{
	try
	{
		if(!event.source)
			return;
		if(event.source.nbt.getBoolean("tdm") && event.player.nbt.getBoolean("tdm"))
		{
			if(event.source.nbt.getString("tdm_team") == event.player.nbt.getString("tdm_team"))
			{
				event.source.message​("停下！你击中了友军！");
				event.player.message​("友军&c" + event.source.name + "&f打中了你.")
			}
		}
	}
	catch(e){}
}

/**
	强制回到复活点
**/
function tick(event)
{
	
}