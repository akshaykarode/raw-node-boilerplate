module.exports = {
	calculateUsers : function(l1,l2){
		if(typeof l1 !=='number' || typeof l2 !=='number'){
			throw new Error('wrong inputs')
		}
		return l1+l2;
	}
}