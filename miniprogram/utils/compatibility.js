// 兼容度规则引擎。输出是建议，不是禁令；不做品种黑名单。

function has(list, value) {
  return list && list.indexOf(value) >= 0
}

function sizeIndex(size) {
  if (size === 'S') return 0
  if (size === 'M') return 1
  return 2
}

function result(level, label, reason) {
  return { level: level, label: label, reason: reason }
}

function evaluate(mine, other) {
  if (other.inHeat) {
    return result('red', '保持距离', '对方今天状态特殊，建议改天再约，不要主动靠近。')
  }
  if (has(other.temperament, 'dog_reactive') || has(other.temperament, 'food_guard')) {
    return result('red', '保持距离', '对方对同类比较敏感，建议绕行或换一条路线，不要主动接触。')
  }
  if (other.sick || other.mood === '情绪差') {
    return result('red', '保持距离', '对方今天状态不好，先别打扰，绕行更稳妥。')
  }

  const diff = Math.abs(sizeIndex(mine.size) - sizeIndex(other.size))

  if (diff >= 2 && !other.onLeash) {
    return result('red', '保持距离', '体型差距较大且对方未牵绳，建议立刻拉开距离。')
  }
  if (diff >= 2) {
    return result('amber', '先观察', '你的狗是 ' + mine.size + ' 型，对方是 ' + other.size + ' 型。建议保持距离平行走一段，看双方反应再决定。')
  }
  if (!mine.neutered && !other.neutered && mine.gender === other.gender) {
    return result('amber', '先观察', '双方未绝育且同性别，建议 sniff & go，不要长时间互动。')
  }
  if (has(other.temperament, 'shy')) {
    return result('amber', '先观察', '对方性格怕生，给它一点空间，别让狗直接凑上去。')
  }
  if (has(other.temperament, 'high_energy')) {
    return result('amber', '先观察', '对方精力比较旺，先牵绳观察，确认双方都放松再放开。')
  }
  if (diff === 0 && mine.neutered && other.neutered && has(other.temperament, 'friendly')) {
    return result('green', '可接触', '体型相近、双方已绝育、性格标签友好。可以先平行走一段，让狗互相嗅闻后再互动。')
  }

  return result('amber', '先观察', '信息还不够，建议保持距离观察一下再决定。')
}

function describe(dog) {
  const tags = []
  tags.push(dog.size + ' 型')
  tags.push(dog.gender + ' · ' + (dog.neutered ? '已绝育' : '未绝育'))
  if (has(dog.temperament, 'friendly')) tags.push('亲人')
  if (has(dog.temperament, 'shy')) tags.push('怕生')
  if (has(dog.temperament, 'high_energy')) tags.push('易兴奋')
  if (has(dog.temperament, 'dog_reactive')) tags.push('对同类敏感')
  if (dog.inHeat) tags.push('发情中')
  tags.push(dog.onLeash ? '牵绳中' : '未牵绳')
  tags.push('当日状态：' + dog.mood)
  return tags
}

module.exports = { evaluate, describe }
