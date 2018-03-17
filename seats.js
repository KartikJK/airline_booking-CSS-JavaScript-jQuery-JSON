var pricing; //Declare pricing as a global variable
$(function(){
  //Get flight details from the server
  $.getJSON('booking1.json',function(d){

    pricing=d.pricing;

    $('#whereFrom').text(d.whereFrom);
    $('#whereTo').text(d.whereTo);
    $('#whereTo1').text(d.whereTo1);

    $('#numSeats').text(d.numSeats);
    $('#numSeats1').text(d.numSeats);
    $('#numSeats2').text(d.numSeats);

    $('#flightId').text(d.flightId);

    $('#takeOffTime').text(d.departAt.substr(11,5));
    $('#landTime').text(d.arriveAt.substr(11,5));

    var leave = new Date(d.departAt);
    $('#date').text(leave.toUTCString().substr(0,16));

    $('#unitPrice').text(d.unitPrice.toFixed(2));
    $('#subTotal').text((d.numSeats*d.unitPrice).toFixed(2));

    // var tdl=$('td');
    // for(var i=0;i<tdl.length;i++){
    //   if(d.alloc[i]===1)
    //     $(tdl[i]).addClass('booked');
    //   if(d.alloc[i]===0)
    //     $(tdl[i]).addClass('free');
    // }

    // Clear the text content and set classes
    var tdl=$('#plan td.n');
    for(var i=0;i<tdl.length;i++){
      if(d.alloc[i]===1)
        $(tdl[i]).addClass('booked');
      if(d.alloc[i]===0)
        $(tdl[i]).addClass('free');
      $(tdl[i]).text('');
    }
  });

  //  Insert row numbers
  var trl=$('#plan table tr');
  for(var i=0;i<trl.length;i++){
    //var tr=$(trl[i]);
    // var td=$('td:nth-child(4)',trl[i]);
    // td.text(i);
    $('td:nth-child(4)',trl[i])
      .text(i)
      .addClass('seatNum'); 

  }


  //Handle the click event
  $('#plan td.n').click(function(){
    // Can i book this seat?
    
    // if($(this).text()==='F'){
    //   $(this).text('B');
    // }
    // else{
    //   if($(this).text()==='B'){
    //     $(this).text('F');
    //   }
    // }

    // if($(this).hasClass('free')){
    //   $(this).addClass('mine')
    //           .removeClass('free');
    // }
    // else{
    //   if($(this).hasClass('mine')){
    //     $(this).addClass('free')
    //             .removeClass('mine');
                
    //   }
    // }

    // How many seats have i booked?
    var bs=$('td.n.mine').length;

    if($(this).hasClass('free') && bs<parseInt($('#numSeats').text())){
      $(this).addClass('mine')
              .removeClass('free');
    }
    else{
      if($(this).hasClass('mine')){
        $(this).addClass('free')
                .removeClass('mine');
                
      }
    }
    // bs=$('td.n.mine').length;
    // $('#seatsAlloc').text(bs);

    var ms=$('td.n.mine');
    $('#seatsAlloc').text(ms.length);
    var sl=ms.map(function(){
      //console.log($(this).attr('id'));
      //return 1;
      //return $(this).attr('id');
      return $(this).attr('id').substr(1).toUpperCase();
    })
    var ul=$('<ul/>');
    for(var i=0;i<sl.length;i++){
      ul.append($('<li/>', {text:sl[i]}));
    }
    $('#bookingSummary ul').remove();
    $('#bookingSummary').append(ul);


    //Calculate the seat prices

    // for(var i=0;i<ms.length;i++){
    //   var sp;
    //   var sid=$(ms[i]).attr('id');
    //   for(var j=0;j<d.pricing.length;j++){
    //     var lo=d.pricing[j].range[0];
    //     var hi=d.pricing[j].range[1];
    //     if(sid>=lo && sid<=hi){
    //       sp=d.pricing[j].price;
    //     }
    //   }
    //   console.log("Found price for",sid,sp);
    // }

    // for(var i=0;i<ms.length;i++){
    //   var sp=-1;
    //   var sid=$(ms[i]).attr('id');
    //   for(var j=0;j<pricing.length;j++){
    //     var lo=pricing[j].range[0];
    //     var hi=pricing[j].range[1];
    //     if(sid>=lo && sid<=hi){
    //       sp=pricing[j].price;
    //     }
    //   }
    //   console.log("Found price for",sid,sp);
    // }

    // for(var i=0;i<ms.length;i++){
    //   var sp=-1;
    //   var sid=parseInt($(ms[i]).attr('id').substr(1));
    //   for(var j=0;j<pricing.length;j++){
    //     var lo=parseInt(pricing[j].range[0].substr(1));
    //     var hi=parseInt(pricing[j].range[1].substr(1));
    //     if(sid>=lo && sid<=hi){
    //       sp=pricing[j].price;
    //     }
    //   }
    //   console.log("Found price for",sid,sp);

    var totPrice=0;
    for(var i=0;i<ms.length;i++){
      var sp=-1;
      var sid=parseInt($(ms[i]).attr('id').substr(1));
      for(var j=0;j<pricing.length;j++){
        var lo=parseInt(pricing[j].range[0].substr(1));
        var hi=parseInt(pricing[j].range[1].substr(1));
        if(sid>=lo && sid<=hi){
          sp=pricing[j].price;
        }
      }
      totPrice+=sp;
    }
    //console.log("Booking price:",totPrice);
    $('#bpt').remove();
    $('<div/>',{text:"Booking price: £"+totPrice,id:'bpt'})
      .appendTo('#tripDetails');
  });
})
