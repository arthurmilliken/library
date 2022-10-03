
select
	Count(Path) as count,
	SHA256,
	group_concat(Path, char(10)) as Paths
from Documents
group by SHA256
having Count(Path) > 1
order by Count(Path) DESC, SHA256
