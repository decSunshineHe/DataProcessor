const findSame = (dItem, groupList, keys, keyIndex, ids) => {
  let isExist = true;
  for (let currentKey = 0; currentKey <= keyIndex; currentKey++) {
    let keyId = keys[currentKey] + "Id";
    // 前几级判断是否相同,不相同直接返回true
    if (ids.length && currentKey < ids.length) {
      if (dItem[keyId] !== ids[currentKey]) {
        isExist = true;
        break;
      }
    }
    // 最后一级判断是否相同
    if (currentKey === keyIndex) {
      let index = groupList.findIndex((g) => g[keyId] === dItem[keyId]);
      if (index === -1) {
        isExist = false;
        break;
      }
    }
  }
  return isExist;
};

/**
 * @method CascaderByKeys
 * @description 扁平数组处理根据key处理为级联数据
 * */

export const CascaderByKeys = (dataList, keys) => {
  if (!Array.isArray(dataList)) {
    console.error("[format-factory]:The first parameter is not an array");
  }
  if (!Array.isArray(keys)) {
    console.error("[format-factory]:The second parameter is not an array");
  }
  let groupList = [];
  function groupByKey(groupList = [], keys, keyIndex = 0, ids = []) {
    const key = keys[keyIndex];
    const keyId = key + "Id";
    const keyName = key + "Name";
    dataList.forEach((item) => {
      if (!item.hasOwnProperty(keyName)) {
        console.error(
          `[format-factory]:This '${keyName}' was not found in dataList`
        );
      }
      let exist = findSame(item, groupList, keys, keyIndex, ids); // 判断是否存在
      if (!exist) {
        if (keyIndex < keys.length - 1) {
          groupList.push({
            children: [],
            [keyName]: item[keyName],
            [keyId]: item[keyId],
          });
        } else {
          groupList.push(item);
        }
      }
    });
    for (let k = 0; k < groupList.length; k++) {
      if (keyIndex + 1 < keys.length) {
        ids.splice(keyIndex, keys.length - keyIndex);
        ids[keyIndex] = groupList[k][keyId];
        groupByKey(groupList[k].children, keys, keyIndex + 1, ids);
      }
    }
  }
  groupByKey(groupList, keys);
  return groupList;
};
