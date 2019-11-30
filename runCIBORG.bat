set DEBUG=* & node ciborg-server.js

::This command boots the application setting the debug level of the execution.
::The variable 'DEBUG' sets the namespaces to be used for debug.
::Below are usage examples and the available debug namespaces.
::
::-------------------------------------USAGE EXAMPLES--------------------------------------
::
::On Windows the environment variable is set using the set command.
::Example:
::set DEBUG=* & node ciborg-server.js
::set DEBUG=ciborg-db:*
::set DEBUG=ciborg-db:getAllGroups & node ciborg-server.js
::set DEBUG=http-call:genericMethodCall,ciborg-db:getAllGroups & node ciborg-server.js
::
::-------------------------------------AVAILABLE NAMESPACES--------------------------------------
::
::http-call:
::	genericMethodCall
::
::
::board-games-data:
::	getMostPopularGames
::	getGamesByID
::	searchByName
::
::ciborg-db:
::	getAllGroups
::	getGroupById
::	createGroup
::	updateGroup
::	getGamesFromGroup
::	addGameToGroup
::	removeGameFromGroup
::	
::ciborg-web-api:
::	resolveServiceResponse
::	getMostPopularGames
::	getGameByName
::	createGroup
::	updateGroup
::	getAllGroups
::	getGroup
::	addGameToGroup
::	removeGameFromGroup
::	getGamesFromGroup
::	
::validator:
::	validateNumeric
::	validateAlfanumeric
::	validateJson
::	validateGameFormat
::	validateGroupWithNoIdFormat
::	validateGroupFormat