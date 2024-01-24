
module Initialize = struct
  module Request = struct
    type t =
      { dune_version : Version.t
      ; protocol_version : Protocol.t
      ; id : Id.t
      }

    let dune_version t = t.dune_version
    let protocol_version t = t.protocol_version
    let id t = t.id

    let create ~id =
      let dune_version = Version.latest in
      let protocol_version = Protocol.latest_version in
      { dune_version; protocol_version; id }
    ;;

    let method_name = "initialize"

    let sexp =
      let open Conv in
      let dune_version = field "dune_version" (required Version.sexp) in
      let protocol_version = field "protocol_version" (required Protocol.sexp) in
      let id = Id.required_field in
      let to_ (dune_version, protocol_version, id) =
        { dune_version; protocol_version; id }
      in
      let from { dune_version; protocol_version; id } =
        dune_version, protocol_version, id
      in
      record (iso (three dune_version protocol_version id) to_ from)
    ;;

    let of_call { Call.method_; params } ~version =
      if String.equal method_ method_name
      then Conv.of_sexp sexp ~version params |> Result.map_error ~f:Response.Error.of_conv
      else (
        let message = "initialize request expected" in
        Error (Response.Error.create ~message ~kind:Invalid_request ()))
    ;;

    let to_call t =
      let params = Conv.to_sexp sexp t in
      { Call.method_ = "initialize"; params }
    ;;
  end

