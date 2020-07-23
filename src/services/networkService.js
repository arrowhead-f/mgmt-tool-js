/**
 * @author Svetlin Tanyi <szvetlin@aitia.ai> on 2020. 07. 10.
 */

import axios from 'axios'

const networkService = axios.create({ timeout: 5000 })

export default networkService
