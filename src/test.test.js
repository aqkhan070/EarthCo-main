tblServiceRequestSprayTechItems
[
{
ItemName	nvarchar(500)	
Notes	nvarchar(1000)	
Rate	float	
Unit	nvarchar(500)	
SprayTechItemId	int	
ServiceRequestId	int	
isUsed	bit	
}
]
tblServiceRequestSprayTeches
[
{
Hours	float	
isTurf	bit	
isShrubs	bit	
isParkways	bit	
isTrees	bit	
Ounces	nvarchar(500)	
Pounds	nvarchar(500)	
Other	nvarchar(500)	
ServiceRequestId	int	
}
]=