function findIdByMaUuDai(arr, maUuDai) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].ma_uu_dai === maUuDai) {
            return arr[i].id;
        }
    }
    return null;
}

export {findIdByMaUuDai }