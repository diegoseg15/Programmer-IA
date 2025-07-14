import mongoengine
import mongomock
import pytest

@pytest.fixture(autouse=True, scope='function')
def mongo_mock():
    from mongoengine import disconnect

    disconnect(alias='default')
    mongoengine.connect(
        db='testdb',
        alias='default',
        host='mongodb://localhost',
        mongo_client_class=mongomock.MongoClient,
        uuidRepresentation='standard'
    )
    yield
    mongoengine.disconnect(alias='default')
