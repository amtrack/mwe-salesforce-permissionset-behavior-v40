var assert = require('assert');
var child = require('child_process');

describe('Retrieving a PermissionSet', function() {
  this.timeout(10 * 60 * 1000);
  before(function() {
    assert.equal(child.spawnSync('npx', ['force-dev-tool', 'deploy', '-d', 'test/unpackaged/setup'], {}).status, 0);
  });
  after(function() {
    assert.equal(child.spawnSync('npx', ['force-dev-tool', 'deploy', '-d', 'test/unpackaged/teardown'], {}).status, 0);
  });
  describe('standalone', function() {
    it('should finish without errors', function() {
      assert.equal(child.spawnSync('npx', ['force-dev-tool', 'retrieve', '-d', 'test/fixtures/permissionset-only'], {}).status, 0);
    });
    it('should only return entries associated with the PermissionSet', function() {
      var result = child.spawnSync('git', ['diff', 'test/fixtures/permissionset-only/permissionsets/Test.permissionset'], {});
      assert.equal(result.stdout.toString(), "");
    });
  });
  describe('with CustomFields', function() {
    it('should finish without errors', function() {
      assert.equal(child.spawnSync('npx', ['force-dev-tool', 'retrieve', '-d', 'test/fixtures/permissionset-with-customfields'], {}).status, 0);
    });
    it('should only return entries associated with the PermissionSet', function() {
      var result = child.spawnSync('git', ['diff', 'test/fixtures/permissionset-with-customfields/permissionsets/Test.permissionset'], {});
      assert.equal(result.stdout.toString(), "");
    });
  });
  describe('with a CustomObject', function() {
    it('should finish without errors', function() {
      assert.equal(child.spawnSync('npx', ['force-dev-tool', 'retrieve', '-d', 'test/fixtures/permissionset-with-customobject'], {}).status, 0);
    });
    it('should only return entries associated with the PermissionSet', function() {
      var result = child.spawnSync('git', ['diff', 'test/fixtures/permissionset-with-customobject/permissionsets/Test.permissionset'], {});
      assert.equal(result.stdout.toString(), "");
    });
  });
});
