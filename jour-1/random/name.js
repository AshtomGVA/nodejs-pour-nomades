var names = [
	"Fredrik",
	"Richardson",
	"Leo",
	"Nyah",
	"Alexandre"
]

module.exports = function(){
	return names[Math.floor(Math.random()*names.length)];
}