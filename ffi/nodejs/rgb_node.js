const lib = require('./build/Release/rgb_node')

exports.Node = class Node {
    constructor(network, dataDir) {
        this.network = network
        this.dataDir = dataDir
        this.runtime = lib.run_rgb_embedded(network, dataDir)
    }

    issue(ticker, name, description, precision, allocations, inflation, renomination, epoch) {
        return lib.issue(
            this.runtime,
            this.network,
            ticker,
            name,
            description || "",
            precision,
            JSON.stringify(allocations || []),
            JSON.stringify(inflation || []),
            JSON.stringify(renomination || null),
            JSON.stringify(epoch || null)
        )
    }

    listAssets() {
        return JSON.parse(lib.list_assets(this.runtime))
    }

    assetAllocations(contractId) {
        return JSON.parse(lib.asset_allocations(this.runtime, contractId))
    }

    outpointAssets(outpoint) {
        return JSON.parse(lib.outpoint_assets(this.runtime, outpoint))
    }

    invoice(contractId, amount, outpoint) {
        return JSON.parse(lib.invoice(contractId, amount, outpoint))
    }

    transfer(inputs, allocate, invoice, prototypePsbt, consignmentFile, transactionFile) {
        return lib.transfer(
            this.runtime,
            JSON.stringify(inputs),
            JSON.stringify(allocate),
            invoice,
            prototypePsbt,
            consignmentFile,
            transactionFile
        )
    }

    validate(consignment_file) {
        return lib.validate(this.runtime, consignment_file)
    }

    accept(consignment_file, reveal_outpoints) {
      return lib.accept(this.runtime, consignment_file, reveal_outpoints)
    }
}
