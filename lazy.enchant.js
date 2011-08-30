/*
 * lazy.enchant.js
 *
 * assetを遅延ロードする。
 * 内部的にはenchant.Game#loadを呼び出すだけです。
 * 
 * 読み込みの完了を捕捉するためには、game.assets[url]のloadイベントにaddEventlistenerすればたぶん大丈夫です。
 *
 */

enchant.lazy = {}
enchant.lazy.load = function(game,url,callback){
	game.load(url,callback)
}
enchant.Game.prototype.lazyload = function(assets){
  if (!(assets instanceof Array)) {
  	assets = Array.prototype.slice.call(arguments);
  }
	for(var i=0;i<assets.length;i++){
		enchant.lazy.load(this,assets[i]);
	}
}
