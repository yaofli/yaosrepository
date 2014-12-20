/**
 * 编辑菜单
 * @param id
 */
function editcategory(path,id){
	location.href=path+"/admin/categorymanager/edit/"+id;
}

function submitEditCategory(){
	document.getElementById("category").submit();
}

/**
 * 新增菜单
 * @param path
 */
function addcategory(path){
	return path+"/admin/categorymanager/add/";
}

function submitAdd(path,obj){
	document.getElementById("menu").submit();
}

function tolist(path){
	location.href=path+"/admin/menumanager";
}

function deletemenu(path,id){
	var result = confirm("确认是否删除？");
	if(result){
		location.href=path+"/admin/menumanager/delete/"+id;
	}
}


