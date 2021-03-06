/*
 * enchant.localstorage.js
 *
 * 画像ファイルをpreloadしつつ、LocalStorageに保存する。
 * 2回目以降はLocalStorageを利用するのでリモートへのアクセスを減らすことができる。
 * enchant.Game#preloadの代わりにenchant.Game#preloadToLocalStorageを使用してください。
 *
 *   ex: game.preloadToLocalStorage('bear.png')
 *
 */
enchant.localstorage = {};
enchant.localstorage.imgUrlToLocalStorage = function(url){
	var img = new Image;
	img.src = url;
	img.alt = url;
	img.addEventListener('load',function(){
		var cvs = document.createElement('canvas');
		cvs.height = this.naturalHeight;
		cvs.width  = this.naturalWidth;
		var ctx = cvs.getContext('2d');
		ctx.drawImage(this,0,0);
		localStorage[this.alt] = '';
		localStorage[this.alt] = cvs.toDataURL();
	});
}
enchant.localstorage.load = function(game,url,callback){
	if (callback == null) callback = function() {};
	var matched = null;
	if(matched = url.match(/([^#]*)(#.*)?/)){
		var filename = matched[1];
		var hash = matched[2];
	}else{ return ;}
	if(localStorage[url]){
		game.assets[url] = enchant.Surface.load(localStorage[url]);
		game.assets[url].addEventListener('load', callback);
	}else{
		game.preload(filename);
		for(var i=localStorage.length-1;i>=0;i--){
			var key = localStorage.key(i);
			if(matched = key.match(/([^#]*)(#.*)?/) && matched[1] == filename){
				localStorage.removeItem(key);
			}
		}
		imgUrlToLocalStorage(url);
	}
}

enchant.Game.prototype.preloadToLocalStorage = function(assets){
    if (!(assets instanceof Array)) {
        assets = Array.prototype.slice.call(arguments);
    }
		for(var i=0;i<assets.length;i++){
			enchant.localstorage.load(this,assets[i]);
		}
}
