/**
 * 编辑菜单
 * @param id
 */
function edit(path,id){
	location.href=path+id;
}

function submitEdit(obj){
	document.getElementById(obj).submit();
}

/**
 * 新增菜单
 * @param path
 */
function add(path){
	location.href=path;
}

function submitAdd(obj){
	document.getElementById(obj).submit();
}

function tolist(path){
	location.href=path+"/admin/menumanager";
}

function deleteObj(path,id){
	var result = confirm("确认是否删除？");
	if(result){
		location.href=path+id;
	}
}

function productmanager(path,id){
	location.href=path+id;
}

function selectOne(brandcode){
	//location.href=path+brandcode;
	alert(brandcode);
}
