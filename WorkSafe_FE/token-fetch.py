import http.client

conn = http.client.HTTPSConnection("dev-ijgfk14f.us.auth0.com")

payload = "{\"client_id\":\"8lCnTD7RbnNZtjRIhwjxmriiaw9Tcv6p\",\"client_secret\":\"qB7UqgEhF_dirGQguJUDPwTRBkE4LmcFaI8lYMbDIV0iyF5F4GVkKnTFNOHx_VZJ\",\"audience\":\"https://worksafe-api\",\"grant_type\":\"client_credentials\"}"

headers = {'content-type': "application/json"}

conn.request("POST", "/oauth/token", payload, headers)

res = conn.getresponse()
data = res.read()

print(data.decode("utf-8"))

conn = http.client.HTTPConnection("https://localhost:7001/api/private-scoped")

headers = {'authorization': "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InZNVHJ6MEtFMElodFc4ZEFNb1A0dyJ9.eyJpc3MiOiJodHRwczovL2Rldi1pamdmazE0Zi51cy5hdXRoMC5jb20vIiwic3ViIjoiOGxDblREN1Jibk5adGpSSWh3anhtcmlpYXc5VGN2NnBAY2xpZW50cyIsImF1ZCI6Imh0dHBzOi8vd29ya3NhZmUtYXBpIiwiaWF0IjoxNjQzMTc1NjY3LCJleHAiOjE2NDMyNjIwNjcsImF6cCI6IjhsQ25URDdSYm5OWnRqUklod2p4bXJpaWF3OVRjdjZwIiwic2NvcGUiOiJyZWFkOm1lc3NhZ2VzIiwiZ3R5IjoiY2xpZW50LWNyZWRlbnRpYWxzIn0.Hx6lnPRY3MVkchqmM_g5PWJwLmD1I3RL6P8qIVYe38B3KssLelPs60Zk9FW_JBctwLqNxbMQYd0ctJwhOgM4z4qCHTdHXrRwzzg4r6SRUUnQE1BVRemDHc2ma2YrIfVwm29rL3hVFj7JWll7jAkrAprdQO0d2nM1T6kqUCy-vKucetBUuwOzyF4CqgFKjeF6xGao2A_jVQ6Wlc-ft1ZSJFyjsVnDOGNjZZbOhnM5jPv-AF0YA_vQ_e7-GLU7SMwA3UR4mBevw-gnclCd-1YAcWAjdm0bUufOMW8aawWtRn9VBbVqGvenE-hocWfHJ7Hq2pvlMlO84eWrqE-VSohIuA"}

conn.request("GET", "/", headers=headers)

res = conn.getresponse()
data = res.read()

print(data.decode("utf-8"))
