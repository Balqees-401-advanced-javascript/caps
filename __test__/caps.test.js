'use strict';

require('../caps');
const events = require('../src/events');

let spyConsole = jest.spyOn(console , 'log').mockImplementation();

describe('event test', () =>{
      
  it('in-transit', () => {
    let user = {
      randomName:'paint',
      orderId:'11222211',
      addres:'qeeww',
      storeName:'mode',
    };
    let comeData = {
      event:'in-transit',
      time: new Date(),
      payload:
      {
        randomName:'paint',
        orderId:'11222211',
        addres:'qeeww',
        storeName:'mode',
      },
    };
    events.emit('in-transit' ,user );
    expect(spyConsole).toHaveBeenCalledWith(comeData);
  });


  it('delivered', () => {
    let user = {
      randomName:'paint',
      orderId:'11222211',
      addres:'qeeww',
      storeName:'mode',
    };
    let comeData = {
      event:'delivered',
      time: new Date(),
      payload:
      {
        randomName:'paint',
        orderId:'11222211',
        addres:'qeeww',
        storeName:'mode',
      },
    };
    events.emit('delivered' ,user );
    expect(spyConsole).toHaveBeenCalledWith(comeData);
  });



  it('delever', () => {
    let user = {
      randomName:'paint',
      orderId:'11222211',
      addres:'qeeww',
      storeName:'mode',
    };

    events.emit('pickup' ,user );
    expect(spyConsole).toHaveBeenCalled();
  });


  
});
