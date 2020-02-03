function kill(event)
{
	if(event.entity.getType() == 1)
	{
		var pMail = event.API.createMail(event.npc.name, "你好")
		pMail.setText(["怎样？"]);
		event.entity.sendMail(pMail);
		event.npc.sayTo(event.entity, "怎样？");
		event.entity.sendNotification("你收到了一份邮件", "请去寻找信箱查看", 0);
	}
}